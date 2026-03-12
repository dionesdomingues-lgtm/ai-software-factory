const { Octokit } = require("@octokit/rest")

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

async function criarBranch(branchName) {

  const repo = process.env.GITHUB_REPO
  const owner = process.env.GITHUB_OWNER

  const main = await octokit.git.getRef({
    owner,
    repo,
    ref: "heads/main"
  })

  const sha = main.data.object.sha

  await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branchName}`,
    sha
  })
}

async function commitArquivo(branch, path, content, message) {

  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO

  const base64 = Buffer.from(content).toString("base64")

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message,
    content: base64,
    branch
  })
}

async function criarPR(branch, title) {

  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO

  await octokit.pulls.create({
    owner,
    repo,
    title,
    head: branch,
    base: "main",
    body: "PR gerado automaticamente pelo AI Orchestrator"
  })
}

module.exports = {
  criarBranch,
  commitArquivo,
  criarPR
}