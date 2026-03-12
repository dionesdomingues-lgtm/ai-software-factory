# Código Node.js - HDFERRO-61

Aqui está um código simples para somar 5+5:

```javascript
// HDFERRO-61: Somar 5+5

function somar(a, b) {
  return a + b;
}

const resultado = somar(5, 5);
console.log(`5 + 5 = ${resultado}`);
```

## Versão mais completa com validações:

```javascript
// HDFERRO-61: Somar 5+5

class Calculadora {
  somar(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Os valores devem ser números');
    }
    return a + b;
  }
}

const calc = new Calculadora();
try {
  const resultado = calc.somar(5, 5);
  console.log(`Resultado: ${resultado}`);
} catch (erro) {
  console.error(`Erro: ${erro.message}`);
}
```

## Versão com módulo exportável:

```javascript
// calculadora.js - HDFERRO-61

module.exports = {
  somar: (a, b) => a + b
};

// app.js
const calculadora = require('./calculadora');
const resultado = calculadora.somar(5, 5);
console.log(`5 + 5 = ${resultado}`);
```

**Para executar:**
```bash
node app.js
```

**Saída esperada:**
```
5 + 5 = 10
```