let generateButton = document.getElementById('generate');
let grid = document.getElementById('grid');

let paintColor = document.getElementById('active-color');
let backgroundColor = document.getElementById('background-color');
let eraser = document.getElementById('erase');

generateButton.addEventListener('click', () => {
  grid.innerHTML = '';

  let eraserHolder = document.getElementById('hidden');
  eraserHolder.style.opacity = 1;
  eraserHolder.style.zIndex = 1;

  let gridInput = document.getElementById('grid-size').value;
  let gridSize = gridInput ** 2;
  let i = 0;

  while (i < gridSize) {
    grid.innerHTML += '<div data-colored="0" class="field" style="width: 20px; height: 20px; background: '+ backgroundColor.value +'"></div>';
    i++;
  }

  let field = document.querySelector('.field');
  console.log(field.style.width);
  let generatedWidth = parseInt(field.style.width, 10) * gridInput + (gridInput * 2);
  console.log(generatedWidth);

  grid.style.width = generatedWidth + 'px';
  grid.style.border = '1px solid #000';

  let generatedFields = document.querySelectorAll('.field');

  var paintField = function() {
    if(eraser.checked) {
      this.style.background = backgroundColor.value;
      this.dataset.colored = 0;
    } 
    
    else {
      this.style.background = paintColor.value;
      this.dataset.colored = 1;
    }
  };
  
  grid.addEventListener("mousedown", function () {
    for (let n = 0; n < generatedFields.length; n++) {
      generatedFields[n].addEventListener("mouseover", paintField);
    }
  });
  
  grid.addEventListener("mouseup", function () {
    for (let n = 0; n < generatedFields.length; n++) {
      generatedFields[n].removeEventListener("mouseover", paintField);
    }
  });

  backgroundColor.addEventListener('change', function() {
    for (let n = 0; n < generatedFields.length; n++) {
      if(generatedFields[n].dataset.colored == 0) {
        generatedFields[n].style.background = backgroundColor.value;
      }
    }
  })
})