const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function gerarCodigoCloudCode(issue) {

  const prompt = `
Crie um código Node.js para a tarefa:

ID: ${issue.identifier}
Título: ${issue.title}
Descrição: ${issue.description || "Sem descrição"}
`;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return response.content[0].text;
}

module.exports = {
  gerarCodigoCloudCode
};
  