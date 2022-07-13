import { useState } from 'react';

export const useCalc = () => {
  const [result, setResult] = useState<number>(0);

  const sum = (...operands: number[]) => {
    setResult(operands.reduce((acc, n) => (acc += n)));
  };

  const sub = (...operands: number[]) => {
    setResult(operands.reduce((acc, n) => (acc -= n)));
  };

  const mul = (...operands: number[]) => {
    if (operands.length <= 1) {
      setResult(operands[0]);
      return;
    }

    let res = 1;

    for (let i = 0; i < operands.length; i++) {
      const operand = operands[i];
      if (operand === 0) {
        res = 0;
        break;
      }
      res *= operand;
    }

    setResult(res);
  };

  const div = (...operands: number[]) => {
    if (operands.length <= 1) {
      setResult(operands[0]);
      return;
    }

    let res = operands[0];

    for (let i = 0; i < operands.length; i++) {
      const operand = operands[i + 1];
      if (operand === 0) {
        res = 0;
        // console.error('U cant divide by zero');
        break;
      }
      if (operand) {
        res /= operand;
      }
    }

    setResult(res);
  };

  return {
    result,
    sum,
    sub,
    mul,
    div,
  };
};
