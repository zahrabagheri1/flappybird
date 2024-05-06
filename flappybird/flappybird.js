// board
let board;
let boardwidth = 360;
let boardheight = 640;
let context;

// bird
let birdwidth = 34; //* width/height ratio = 408/228 = 17/12
let birdheight = 24;
let birdX = boardwidth / 8;
let birdY = boardheight / 2;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdwidth,
  height: birdheight,
};

window.onload = function () {
  board = document.getElementById("flappybird-board");
  board.width = boardwidth;
  board.height = boardheight;
  context = board.getContext("2d"); // used for drawing on the board

  // draw flappy bird
  // context.fillstyle = "green";
  // context.fillRect(bird.x, bird.y, bird.width, bird.height);

  // load images
  birdImg = new Image();
  birdImg.src = "./flappybird.png";
  birdImg.onload = function(){
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
  }
};
