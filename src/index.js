function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // ALWAYS SORT BY PRIORITY
  const OPERATORS = {
    '^': (a, b) => a ** b,
    '%': (a, b) => a % b,
    '/': (a, b) => {
      if (b === 0) throw new TypeError('TypeError: Division by zero.');
      return a / b;
    },
    '*': (a, b) => a * b,
    '-': (a, b) => a - b,
    '+': (a, b) => a + b,
  };

  const FUNCTIONS = {
    log: (a, b) => Math.log(b) / Math.log(a),
    sqrt: (a) => Math.sqrt(a),
    sin: (a) => Math.sin(a),
    cos: (a) => Math.cos(a),
  };

  const NUMBER_REGEXP = '(-?[0-9.]+)';
  const BRACKETS_REGEXP = /\w*?\(([^()]*)\)/;

  function parse(expression) {
    let deepestExp = findDeepestExpression(expression);
    console.log(deepestExp);
    return deepestExp ? parse(calc(deepestExp)) : calc(expression);
  }

  function findDeepestExpression(expression) {
    console.log(expression);
    if (!expression.search(/[()]/)) return 0;
    if (!expression.search(BRACKETS_REGEXP)) {
      console.log(`Error - ${expression}`);
      // throw new SyntaxError('ExpressionError: Brackets must be paired');
    }
    return expression.match(BRACKETS_REGEXP)[1];
  }

  function calc(expression) {
    console.log('first - ' + expression);
    for (let operator in OPERATORS) {
      let regExp = `${NUMBER_REGEXP}\\${operator}${NUMBER_REGEXP}`;
      let matches;
      while ((matches = expression.match(regExp))) {
        let [expr, a, b] = matches;
        let result = OPERATORS[operator](+a, +b);
        console.log(`here - ${result}`);

        expression = expression.replace(expr, result);
        console.log(expression);
      }
    }
    console.log('last - ' + expression);
    return +expression;
  }

  return parse(expr.replace(/\s/g, ''));
}

console.log(
  expressionCalculator(
    '93-42/(80*45+46+(66*45-26*0*84))-((20-59-18-62)/(9/90*16-6)*3)'
  )
);

module.exports = {
  expressionCalculator,
};
