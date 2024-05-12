let candies = ["Blue", "Orange", "Yellow", "Green", "Red", "Purple"];
let board = [];

let rows = 9;
let columns = 9;
let score = 0;

var currTile;
var otherTile;

window.onload = function () {
  startGame();
};

function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)]; // 0 - 5.99
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      // * <img id="0-0" src="./images/Red.png">
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = "./images/" + randomCandy() + ".png";

      // * Drag Functionality
      tile.addEventListener("dragstart", dragStart); //? Click on a candy, initialize drag process
      tile.addEventListener("dragover", dragOver); //? Clicking on candy, moving mouse to drag the candy
      tile.addEventListener("dragenter", dragEnter); //? Dragging candy onto another candy
      tile.addEventListener("dragleave", dragLeave); //? Leave candy over another candy
      tile.addEventListener("drop", dragDrop); //? Dropping a candy over another candy
      tile.addEventListener("dragend", dragEnd); //? After drag process completed, we swap candies

      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
  console.log(board);
}

function dragStart() {
  // ! This refers to tile that was dragging
  currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    // ! This refers to the target tile that was dropping on
    otherTile = this;
}


function dragEnd() {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

}

