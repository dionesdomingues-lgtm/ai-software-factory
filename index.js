require("dotenv").config();

const express = require("express");
const github = require("./services/github");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const { gerarCodigoCloudCode } = require("./cloudcode");

const app = express();

/*
Webhook do Linear precisa receber o body RAW
*/
app.use("/webhook/linear", express.raw({ type: "application/json" }));

const SIGNING_SECRET = process.env.LINEAR_SIGNING_SECRET;

/*
Comparação segura de assinatura
*/
function safeCompare(a, b) {
  if (!a || !b) return false;
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(
    Buffer.from(a),
    Buffer.from(b)
  );
}

function verifySignature(req) {
  const signature = req.get("linear-signature");
  const timestamp = req.get("linear-timestamp");

  if (!signature) {
    console.log("❌ Header linear-signature ausente");
    return false;
  }

  const rawBody = req.body.toString("utf8");

  // validação com timestamp
  if (timestamp) {

    const payload = `${timestamp}.${rawBody}`;

    const hash = crypto
      .createHmac("sha256", SIGNING_SECRET)
      .update(payload)
      .digest("hex");

    if (safeCompare(hash, signature)) {
      console.log("✔ Assinatura válida (timestamp)");
      return true;
    }
  }

  // fallback sem timestamp
  const hashBody = crypto
    .createHmac("sha256", SIGNING_SECRET)
    .update(rawBody)
    .digest("hex");

  if (safeCompare(hashBody, signature)) {
    console.log("✔ Assinatura válida (body)");
    return true;
  }

  console.log("❌ Assinatura inválida");
  return false;
}

/*
Cria arquivo de tarefa
*/
function criarTarefa(issue) {

  const dir = path.join(__dirname, "tasks");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const fileName = `task-${issue.identifier}.md`;
  const filePath = path.join(dir, fileName);

  const conteudo = `
# ${issue.identifier} - ${issue.title}

## Descrição
${issue.description || "Sem descrição"}

## Status
${issue.state?.name}

## Criado em
${new Date().toLocaleString()}

---

## Checklist

- [ ] Criar estrutura
- [ ] Implementar lógica
- [ ] Testar
- [ ] Commit no GitHub
`;

  fs.writeFileSync(filePath, conteudo);

  console.log("📄 Tarefa criada:", fileName);
}

/*
Salva código gerado e cria PR
*/
async function salvarCodigo(issue, codigo) {

  const dir = path.join(__dirname, "generated");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const fileName = `${issue.identifier}.js`;
  const filePath = path.join(dir, fileName);

  fs.writeFileSync(filePath, codigo);

  console.log("⚙️ Código gerado:", fileName);

  const branch = `feature/${issue.identifier}`;

  await github.criarBranch(branch);

  await github.commitArquivo(
    branch,
    `generated/${issue.identifier}.js`,
    codigo,
    `feat: implementação automática ${issue.identifier}`
  );

  await github.criarPR(
    branch,
    `Implementação automática ${issue.identifier}`
  );
}

/*
Webhook do Linear
*/
app.post("/webhook/linear", async (req, res) => {

  if (!verifySignature(req)) {
    return res.status(401).send("Invalid signature");
  }

  const body = JSON.parse(req.body.toString("utf8"));

  console.log("Evento:", body.action);

  if (
    body.action === "update" &&
    body.data &&
    body.data.state &&
    body.data.state.name === "Approved for Dev"
  ) {

    const issue = body.data;

    console.log("🚀 Issue aprovada:", issue.identifier);

    criarTarefa(issue);

    const codigo = await gerarCodigoCloudCode(issue);

    await salvarCodigo(issue, codigo);
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Orquestrador rodando na porta 3000");
});