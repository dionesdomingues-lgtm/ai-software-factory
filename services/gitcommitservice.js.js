const simpleGit = require("simple-git");

const git = simpleGit();

async function commitCodigo(issue, arquivo) {

  await git.add(arquivo);

  await git.commit(`feat: implementação automática ${issue.identifier}`);

  await git.push();

  console.log("Código enviado para GitHub");
}

module.exports = { commitCodigo };