let candies = ["Blue", "Orange", "Yellow", "Green", "Red", "Purple"];
let board = [];

let rows = 9;
let columns = 9;
let score = 0;

var currTile;
var otherTile;

let loadGame = new Audio("./sounds/loadGame.wav");
let notmoveSound = new Audio("./sounds/notmovesound.wav");
let moveSound = new Audio("./sounds/movesound.wav");
moveSound.volume = 0.5;

window.onload = function () {
  startGame();

  //1/10th of a second
  window.setInterval(function () {
    crushCandy();
    slideCandy();
    generateNewCandy();
  }, 200);
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
  if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return;
  }

  let currCoords = currTile.id.split("-"); //? id="0-0" -> ["0","0"]
  let currRow = parseInt(currCoords[0]);
  let currColumn = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let otherRow = parseInt(otherCoords[0]);
  let otherColunm = parseInt(otherCoords[1]);

  let moveLeft = otherColunm == currColumn - 1 && currRow == otherRow;
  let moveRight = otherColunm == currColumn + 1 && currRow == otherRow;
  let moveTop = otherRow == currRow - 1 && currColumn == otherColunm;
  let moveDown = otherRow == currRow + 1 && currColumn == otherColunm;

  let isAdjacent = moveLeft || moveRight || moveTop || moveDown;

  if (isAdjacent) {
    moveSound.play();
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
    let validMove = checkValid();
    if (!validMove) {
      notmoveSound.play();
      let currImg = currTile.src;
      let otherImg = otherTile.src;
      currTile.src = otherImg;
      otherTile.src = currImg;
    }
  }
}

function crushCandy() {
  // crushFive()
  // crushFoure()
  crushThree();
  document.getElementById("score").innerText = score;
}

function crushThree() {
  // * Check For Rows
  for (let row = 0; row < rows; row++) {
    for (let colunm = 0; colunm < columns - 2; colunm++) {
      let candyOne = board[row][colunm];
      let candyTwo = board[row][colunm + 1];
      let candyThree = board[row][colunm + 2];

      if (
        candyOne.src == candyTwo.src &&
        candyTwo.src == candyThree.src &&
        !candyOne.src.includes("blank")
      ) {
        candyOne.src = "./images/blank.png";
        candyTwo.src = "./images/blank.png";
        candyThree.src = "./images/blank.png";
        score += 30;
      }
    }
  }

  // * Check For Column
  for (let colunm = 0; colunm < columns; colunm++) {
    for (let row = 0; row < rows - 2; row++) {
      let candyOne = board[row][colunm];
      let candyTwo = board[row + 1][colunm];
      let candyThree = board[row + 2][colunm];

      if (
        candyOne.src == candyTwo.src &&
        candyTwo.src == candyThree.src &&
        !candyOne.src.includes("blank")
      ) {
        candyOne.src = "./images/blank.png";
        candyTwo.src = "./images/blank.png";
        candyThree.src = "./images/blank.png";
        score += 30;
      }
    }
  }
}

function checkValid() {
  // * Check For Rows
  for (let row = 0; row < rows; row++) {
    for (let colunm = 0; colunm < columns - 2; colunm++) {
      let candyOne = board[row][colunm];
      let candyTwo = board[row][colunm + 1];
      let candyThree = board[row][colunm + 2];

      if (
        candyOne.src == candyTwo.src &&
        candyTwo.src == candyThree.src &&
        !candyOne.src.includes("blank")
      ) {
        return true;
      }
    }
  }

  // * Check For Column
  for (let colunm = 0; colunm < columns; colunm++) {
    for (let row = 0; row < rows - 2; row++) {
      let candyOne = board[row][colunm];
      let candyTwo = board[row + 1][colunm];
      let candyThree = board[row + 2][colunm];

      if (
        candyOne.src == candyTwo.src &&
        candyTwo.src == candyThree.src &&
        !candyOne.src.includes("blank")
      ) {
        return true;
      }
    }
  }
  return false;
}

function slideCandy() {
  for (let colunm = 0; colunm < columns; colunm++) {
    let ind = rows - 1;
    for (let row = columns - 1; row >= 0; row--) {
      if (!board[row][colunm].src.includes("blank")) {
        board[ind][colunm].src = board[row][colunm].src;
        ind -= 1;
      }
    }

    for (let row = ind; row >= 0; row--) {
      board[row][colunm].src = "./images/blank.png";
    }
  }
}

function generateNewCandy() {
  for (let colunm = 0; colunm < columns; colunm++) {
    if (board[0][colunm].src.includes("blank")) {
      board[0][colunm].src = "./images/" + randomCandy() + ".png";
    }
  }
}
