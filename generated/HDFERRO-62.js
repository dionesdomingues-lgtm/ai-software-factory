# Código Node.js - HDFERRO-62: Subtrair 5-2

Aqui estão algumas formas de resolver essa tarefa:

## 1. Solução Simples

```javascript
// HDFERRO-62: Subtrair 5-2
const resultado = 5 - 2;
console.log(`5 - 2 = ${resultado}`);
```

**Output:**
```
5 - 2 = 3
```

## 2. Solução com Função

```javascript
// HDFERRO-62: Subtrair 5-2
function subtrair(a, b) {
  return a - b;
}

const resultado = subtrair(5, 2);
console.log(`${5} - ${2} = ${resultado}`);
```

## 3. Solução com Classe

```javascript
// HDFERRO-62: Subtrair 5-2
class Calculadora {
  subtrair(a, b) {
    return a - b;
  }
}

const calc = new Calculadora();
const resultado = calc.subtrair(5, 2);
console.log(`Resultado: ${resultado}`);
```

## 4. Solução com Arrow Function

```javascript
// HDFERRO-62: Subtrair 5-2
const subtrair = (a, b) => a - b;

console.log(`5 - 2 = ${subtrair(5, 2)}`);
```

## 5. Solução com Teste Unitário (Jest)

```javascript
// calculadora.js
function subtrair(a, b) {
  return a - b;
}

module.exports = subtrair;

// calculadora.test.js
const subtrair = require('./calculadora');

describe('HDFERRO-62: Subtrair 5-2', () => {
  test('deve subtrair 5 - 2 e retornar 3', () => {
    expect(subtrair(5, 2)).toBe(3);
  });
});
```

**Para executar o teste:**
```bash
npm install --save-dev jest
npm test
```

---

**Recomendação:** Use a **Solução 1** para simplicidade ou a **Solução 5** se precisar de testes automatizados em um projeto maior.