# Código Node.js para HDFERRO-64

Aqui estão algumas formas de resolver essa tarefa:

## Opção 1: Solução Simples

```javascript
// hdferro-64.js
const resultado = 1 + 2 + 3;
console.log(`Resultado de 1+2+3: ${resultado}`);
```

## Opção 2: Função Reutilizável

```javascript
// hdferro-64.js
function somarNumeros(...numeros) {
  return numeros.reduce((acc, num) => acc + num, 0);
}

const resultado = somarNumeros(1, 2, 3);
console.log(`Resultado de 1+2+3: ${resultado}`);
```

## Opção 3: Classe (Mais Estruturado)

```javascript
// hdferro-64.js
class Calculadora {
  somar(...numeros) {
    return numeros.reduce((acc, num) => acc + num, 0);
  }
}

const calc = new Calculadora();
const resultado = calc.somar(1, 2, 3);
console.log(`Resultado de 1+2+3: ${resultado}`);
```

## Opção 4: Com Teste Unitário

```javascript
// hdferro-64.js
const soma = (a, b, c) => a + b + c;

console.log(`Resultado: ${soma(1, 2, 3)}`);

// Teste
if (soma(1, 2, 3) === 6) {
  console.log('✓ Teste passou!');
} else {
  console.log('✗ Teste falhou!');
}
```

---

## Como Executar

```bash
node hdferro-64.js
```

**Saída esperada:**
```
Resultado de 1+2+3: 6
✓ Teste passou!
```

Escolha a opção que melhor se adequa ao seu projeto! 🚀