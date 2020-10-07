const add = (x, y) => {
  return (+x + +y).toString();
}

const subtract = (x, y) => {
  return (+x - +y).toString();
}

const multiply = (x, y) => {
  return (+x * +y).toString();
}

const divide = (x, y) => {
  if (y == 0) return 'Undefined';
  return (+x / +y).toString();
}

const negative = x => {
  return (-1 * +x).toString();
}

const percent = x => {
  return (+x / 100).toString();
}

const display = (sc, val) => {
  sc.style.fontSize = '3em';

  if (val.length <= 9) {
    sc.style.fontSize = '3em';
  } else if (val.length > 9 && val.length <= 12) {
    sc.style.fontSize = '2em';
  } else if (val.length > 12 && val.length <= 17) {
    sc.style.fontSize = '1.5em';
  } else if (val.length > 17 && val.length <= 21) {
    sc.style.fontSize = '1.2em';
  } else if (val.length > 21) {
    val = 'Number too large';
    sc.style.fontSize = '1.5em';
  }
  sc.textContent = val.toString();
}

const calculate = (x, y, func) => {
  if (func == '+') return add(x, y);
  else if (func == '-') return subtract(x, y);
  else if (func == 'x') return multiply(x, y);
  else if (func == '/') return divide(x, y);
}

(function() {
  let first = '';
  let operator = ''
  let second = '';
  let screen = document.querySelector('#screen');

  // Clear screen
  let clrBtn = document.querySelector('#clear');
  clrBtn.addEventListener('click', () => {
    first = '';
    operator = '';
    second = '';
    display(screen, 0);
  });

  // Numbers input
  let numBtns = document.querySelectorAll('.number');
  numBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {

      // Reset variables when user click on numbers without defined operators
      if (operator == '=') {
        first = '';
        operator = '';
      }

      if (!operator) {
        first += e.target.value;
        display(screen, first);
      } else if (operator != '=') {
        second += e.target.value;
        display(screen, second);
      }
    });
  });

  // Equal only works when operands and operator exist
  let eqBtn = document.querySelector('#equal');
  eqBtn.addEventListener('click', () => {
    if (first && second && operator) {
      first = calculate(first, second, operator);
      display(screen, first);
      second = '';
      operator = '=';
    }
  });

  // Negative input
  let negBtn = document.querySelector('#negative');
  negBtn.addEventListener('click', () => {
    if (first && second) {
      second = negative(second);
      display(screen, second);
    } else if (first) {
      first = negative(first);
      display(screen, first);
    }
  });

  // Percent input
  let pctBtn = document.querySelector('#percent');
  pctBtn.addEventListener('click', () => {
    if (first && second) {
      second = percent(second);
      display(screen, second);
    } else if (first) {
      first = percent(first);
      display(screen, first);
    }
  });

  // Decimal input
  let decBtn = document.querySelector('#decimal');
  decBtn.addEventListener('click', () => {
    if (first && second) {
      if (!second.includes('.')) {
        second += '.';
        display(screen, second);
      }
    } else if (first) {
      if (!first.includes('.')) {
        first += '.';
        display(screen, first);
      }
    }
  })

  // Operations input
  let operations = document.querySelectorAll('.operation');
  operations.forEach(btn => {
    btn.addEventListener('click', (e) => {
      let op = e.target.value;

      if (first && second) {
        operator = op;
        first = calculate(first, second, operator);
        display(screen, first);
        second = '';
      } else if (first) {
        operator = op;
      }
    });
  });
})();