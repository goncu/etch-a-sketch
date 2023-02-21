// initial settings
let numberOfColumns = 16;
let numberOfRows = 16;
// arrow functions for selecting elements
const classSelect = (a) => document.querySelector(`.${a}`);
const idSelect = (a) => document.getElementById(`${a}`);
// function for creating the boxes
const createBoxes = function (i, y) {
  for (let i = 1; i <= numberOfColumns; i++) {
    for (let y = 1; y <= numberOfRows; y++) {
      const box = document.createElement(`div`);
      box.classList.add(`box`);
      box.setAttribute(`id`, `${i}--${y}`);
      classSelect(`container`).appendChild(box);
    }
  }
};
//function for painting the boxes
let paintBoxes = function (a, b, c) {
  for (let i = 1; i <= numberOfColumns; i++) {
    for (let y = 1; y <= numberOfRows; y++) {
      idSelect(`${i}--${y}`).addEventListener(`mouseover`, function () {
        idSelect(`${i}--${y}`).style.backgroundColor = `rgb(${a}, ${b}, ${c})`;
      });
    }
  }
};
//function for toggling draw and erase buttons
const toggleButtons = function (a, b) {
  classSelect(a).classList.add(`active`);
  classSelect(b).classList.remove(`active`);
};
//initialize
createBoxes(numberOfColumns, numberOfRows);
//for changing the size. Ask for a value; if outside limits, ask again. Then, delete the board and initialize with the new value.
classSelect(`btn-change-size`).addEventListener(`click`, function () {
  let manualSize = document.getElementById(`change-size`).value;
  if (manualSize > 0 && manualSize <= 100) {
    numberOfColumns = manualSize;
    numberOfRows = manualSize;
    classSelect(
      `container`
    ).style.gridTemplateColumns = `repeat(${manualSize}, auto)`;
    classSelect(
      `container`
    ).style.gridTemplateRows = `repeat(${manualSize}, auto)`;
    classSelect(`container`).innerHTML = ``;
    createBoxes(numberOfColumns, numberOfRows);
  }
});
//for drawing
classSelect(`btn-draw`).addEventListener(`click`, () => {
  toggleButtons(`btn-draw`, `btn-erase`);
  paintBoxes(0, 0, 0);
});
//for erasing
classSelect(`btn-erase`).addEventListener(`click`, () => {
  toggleButtons(`btn-erase`, `btn-draw`);
  paintBoxes(250, 235, 215);
});
//for randomizing the color.
classSelect(`change-color`).addEventListener(`click`, function () {
  toggleButtons(`btn-draw`, `btn-erase`);
  let red = Math.trunc(Math.random() * 256);
  let green = Math.trunc(Math.random() * 256);
  let blue = Math.trunc(Math.random() * 256);
  paintBoxes(red, green, blue);
});
//for rainbow
classSelect(`rainbow`).addEventListener(`click`, function () {
  toggleButtons(`btn-draw`, `btn-erase`);
  for (let i = 1; i <= numberOfColumns; i++) {
    for (let y = 1; y <= numberOfRows; y++) {
      idSelect(`${i}--${y}`).addEventListener(`mouseover`, function () {
        let red = Math.trunc(Math.random() * 256);
        let green = Math.trunc(Math.random() * 256);
        let blue = Math.trunc(Math.random() * 256);
        this.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
      });
    }
  }
});
//for choosing the color
classSelect(`choose-color`).addEventListener(`input`, function (e) {
  toggleButtons(`btn-draw`, `btn-erase`);
  const colorValue = classSelect(`choose-color`).value;
  const red = parseInt(colorValue.substr(1, 2), 16);
  const green = parseInt(colorValue.substr(3, 2), 16);
  const blue = parseInt(colorValue.substr(5, 2), 16);
  paintBoxes(red, green, blue);
});
//for resetting
classSelect(`reset`).addEventListener(`click`, function () {
  document.querySelectorAll(`.box`).forEach(function (e) {
    e.style.backgroundColor = `rgb(250, 235, 215)`;
  });
});
