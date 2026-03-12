# Solução Node.js para HDFERRO-63

Aqui está um código Node.js para a tarefa de somar 1 + 2 + 3:

## Opção 1: Simples (Direto)

```javascript
// task-hdferro-63.js

const sum = 1 + 2 + 3;
console.log(`Resultado: ${sum}`);
```

## Opção 2: Com Função

```javascript
// task-hdferro-63.js

function sumNumbers(numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

const result = sumNumbers([1, 2, 3]);
console.log(`Integração teste 123`);
console.log(`Resultado da soma: ${result}`);
```

## Opção 3: Com Estrutura de Projeto

```javascript
// hdferro-63.js

class Task {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  execute() {
    const numbers = [1, 2, 3];
    const result = numbers.reduce((acc, num) => acc + num, 0);
    
    console.log(`\n=== Tarefa ${this.id} ===`);
    console.log(`Título: ${this.title}`);
    console.log(`Descrição: ${this.description}`);
    console.log(`Resultado: ${result}\n`);
    
    return result;
  }
}

// Executar
const task = new Task('HDFERRO-63', 'integração teste 123', 'somar 1 + 2 + 3');
task.execute();
```

## Opção 4: Com Express (API REST)

```javascript
// server.js

const express = require('express');
const app = express();

app.get('/hdferro-63', (req, res) => {
  const result = 1 + 2 + 3;
  
  res.json({
    id: 'HDFERRO-63',
    title: 'integração teste 123',
    description: 'somar 1 + 2 + 3',
    result: result
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
  console.log('Acesse: http://localhost:3000/hdferro-63');
});
```

Para rodar com Express:
```bash
npm install express
node server.js
```

**Escolha a opção que melhor se adequa ao seu projeto!** 🚀