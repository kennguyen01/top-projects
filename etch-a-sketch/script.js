/**
 * Create radio buttons for sketch size.
 */
(function() {
  let fieldset = document.querySelector('.size');

  for (let i = 16; i <= 128; i *= 2) {
    let radio = document.createElement('input');
    let label = document.createElement('label');
  
    radio.id = radio.value = i;
    radio.type = 'radio';
    radio.name = 'sketch-size';
    if (i == 16) {
      radio.checked = true;
    }
  
    label.appendChild(document.createTextNode(i.toString()));
    label.htmlFor = radio.id;
    
    fieldset.appendChild(radio);
    fieldset.appendChild(label);
  }
})();

/**
 * Change squares to white if clear is true, otherwise
 * black on hover.
 * 
 * @param {boolean} clear
 */
function changeColor(clear = false) {
  let squares = document.querySelectorAll('.square');
  squares.forEach((square) => {
    if (!clear) {
      square.addEventListener('mouseover', () => {
        square.classList.add('touched');
      });
    } else {
      square.classList.remove('touched');
    }
  });
}

/**
 * Create a new sketch from size. Remove sketch if one exists.
 * 
 * @param {number} size
 */
function drawSketch(size = 16) {
  let container = document.querySelector('.container');

  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size**2; i++) {
    let div = document.createElement('div');
    div.classList.add('square');
    container.appendChild(div);
  }
}

/**
 * Change square color on button pressed.
 */
const clear = document.querySelector('#clear-sketch');
clear.addEventListener('click', () => {
  changeColor(true);
});

/**
 * Create new sketch based on input size.
 */
const newSketch = document.querySelector('#new-sketch');
newSketch.addEventListener('click', () => {
  let sketchSize;
  let radios = document.getElementsByName('sketch-size');
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      sketchSize = +radios[i].value;
      break;
    }
  }
  drawSketch(sketchSize);
  changeColor();
});

/**
 * Create default sketch on first load.
 */
window.onload = () => {
  drawSketch();
  changeColor();
};