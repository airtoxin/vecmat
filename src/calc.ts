import { add, dot, isVector, mul, sub, Vector } from './Vector'

export const calc = (litterals: TemplateStringsArray, ...placeholders: any[]): Vector | number => {
  let operators = [...litterals].map(s => s.replace(/\s/g, ""));
  let stack: any[] = [];
  let vars: any[] = [...placeholders];

  while (1) {
    const operator = operators.shift();
    if (operator == null) break;

    switch (operator) {
      case "": {
        const s = vars.shift();
        if (s) stack.push(s);
        break;
      }
      case "+": {
        const a = stack.pop();
        const b = vars.shift();
        stack.push(performAdd(a, b));
        break;
      }
      case "-": {
        const a = stack.pop();
        const b = vars.shift();
        stack.push(performSub(a, b));
        break;
      }
      case "*": {
        const a = stack.pop();
        const b = vars.shift();
        stack.push(performMul(a, b));
        break;
      }
      case "@": {
        const a = stack.pop();
        const b = vars.shift();
        stack.push(performDot(a, b));
        break;
      }
      default:
        throw new Error(`Unexpected operator: ${operator}`);
    }
  }

  return stack.pop();
};

const performAdd = (a: any, b: any): Vector => {
  if (isVector(a) && isVector(b)) {
    return add(a, b);
  } else {
    throw new Error(`Can't calculate ${JSON.stringify(a)} + ${JSON.stringify(b)}`)
  }
};

const performSub = (a: any, b: any): Vector => {
  if (isVector(a) && isVector(b)) {
    return sub(a, b);
  } else {
    throw new Error(`Can't calculate ${JSON.stringify(a)} - ${JSON.stringify(b)}`)
  }
};

const performMul = (a: any, b: any): Vector => {
  if (isVector(a) && (isVector(b) || typeof b === "number")) {
    return mul(a, b);
  } else if (typeof a === "number" && isVector(b)) {
    return mul(b, a);
  } else {
    throw new Error(`Can't calculate ${JSON.stringify(a)} * ${JSON.stringify(b)}`)
  }
};

const performDot = (a: any, b: any): number => {
  if (isVector(a) && isVector(b)) {
    return dot(a, b);
  } else {
    throw new Error(`Can't calculate ${JSON.stringify(a)} @ ${JSON.stringify(b)}`)
  }
};
