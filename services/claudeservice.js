const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

async function gerarCodigoCloudCode(issue) {

  const prompt = `
Crie um código JavaScript baseado neste requisito.

Título:
${issue.title}

Descrição:
${issue.description}
`;

  const response = await client.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 800,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return response.content[0].text;
}

module.exports = { gerarCodigoCloudCode };