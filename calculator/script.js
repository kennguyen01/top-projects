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
  return (+x / +y).toFixed(4).toString();
}

const negative = x => {
  return (-1 * +x).toString();
}

const percent = x => {
  return (+x / 100).toString();
}

const display = (sc, val) => {
  if (val.length > 9 && val.includes('e')) {
    let start = `${val[0]}`;
    let end = val.slice(1, 6);
    let notation = val.length.toString();

    if (notation < 20) {
      val = `${start}.${end}e${notation.sup()}`;
    } else {
      val = 'Error';
    }
  } else if (val.length > 9) {
    val = (+val).toFixed(4);
  }
  sc.innerHTML = val.toString();
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
      if (!operator) {
        first += e.target.value;
        console.log(`1st: ${first}`);
        display(screen, first);
      } else {
        second += e.target.value;
        console.log(`2nd: ${second}`);
        display(screen, second);
      }
    });
  });

  // Calculate with equal
  let eqBtn = document.querySelector('#equal');
  eqBtn.addEventListener('click', () => {
    if (first && second && operator) {
      first = calculate(first, second, operator);
      display(screen, first);
      second = '';
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

  // Operation input
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
        console.log(`Operator: ${operator}`);
      }
    });
  });
})();