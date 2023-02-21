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
const paintBoxes = function () {
  for (let i = 1; i <= numberOfColumns; i++) {
    for (let y = 1; y <= numberOfRows; y++) {
      idSelect(`${i}--${y}`).addEventListener(`mouseover`, function () {
        this.style.backgroundColor = `rgb(0, 0, 0)`;
      });
    }
  }
};
//function for initializing
const initialize = () => {
  createBoxes(numberOfColumns, numberOfRows);
  paintBoxes();
};
//initializing the first board
initialize();
//for changing the size. Ask for a value; if outside limits, ask again. Then, delete the board and initialize with the new value.
classSelect(`change-size`).addEventListener(`click`, function () {
  let manualSize;
  function editSize() {
    manualSize = Number(
      prompt(
        `Enter a number between 0-100 for the number of boxes per column and row`
      )
    );
    if (!(manualSize <= 100 && manualSize > 0)) {
      editSize();
    }
  }
  editSize();
  numberOfColumns = manualSize;
  numberOfRows = manualSize;
  classSelect(
    `container`
  ).style.gridTemplateColumns = `repeat(${manualSize}, auto)`;
  classSelect(
    `container`
  ).style.gridTemplateRows = `repeat(${manualSize}, auto)`;
  classSelect(`container`).innerHTML = ``;
  initialize();
});
//for randomizing the color.
classSelect(`change-color`).addEventListener(`click`, function () {
  let red = Math.trunc(Math.random() * 256);
  let green = Math.trunc(Math.random() * 256);
  let blue = Math.trunc(Math.random() * 256);
  const toSubtractFromRed = Math.floor((red * 10) / 100);
  const toSubtractFromGreen = Math.floor((green * 10) / 100);
  const toSubtractFromBlue = Math.floor((blue * 10) / 100);
  for (let i = 1; i <= numberOfColumns; i++) {
    for (let y = 1; y <= numberOfRows; y++) {
      idSelect(`${i}--${y}`).addEventListener(`mouseover`, function () {
        this.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        if (red > 0) {
          red -= toSubtractFromRed;
          if (red < 0) {
            red = 0;
          }
        }
        if (green > 0) {
          green -= toSubtractFromGreen;
          if (green < 0) {
            green = 0;
          }
        }
        if (blue > 0) {
          blue -= toSubtractFromBlue;
          if (blue < 0) {
            blue = 0;
          }
        }
      });
    }
  }
});
//for rainbow
classSelect(`rainbow`).addEventListener(`click`, function () {
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
