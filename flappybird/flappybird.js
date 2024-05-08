// * Board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// * Bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

// * Pipes
let pipesArray = [];
let pipesWidth = 64;
let pipesHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// * Physics
let velocityX = -3; //pipes moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0.3;

let gameover = false;
let score = 0;

window.onload = function () {
  board = document.getElementById("flappybird-board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d"); // used for drawing on the board

  // * Load images -> bird
  birdImg = new Image();
  birdImg.src = "./img/flappybird.png";
  birdImg.onload = function () {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  // * Load images -> pipes
  topPipeImg = new Image();
  topPipeImg.src = "./img/toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./img/bottompipe.png";

  requestAnimationFrame(update);
  setInterval(placePipes, 1500); //every 1.5 seconds
  document.addEventListener("keydown", movebird);
};

function update() {
  requestAnimationFrame(update);
  if (gameover) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);

  // * Bird
  velocityY += gravity;
  // bird.y += velocityY;
  bird.y = Math.max(bird.y + velocityY, 0); //apply gravity to current bird.y , limit the bird.y to top of the canvas
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > board.height) {
    gameover = true;
  }

  // * Pipes
  for (let i = 0; i < pipesArray.length; i++) {
    const pipe = pipesArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5; // because there are two pipes! 0.5 *2 = 1 , 1 score for each set of pipes
      pipe.passed = true;
    }

    if (detectCllision(bird, pipe)) {
      gameover = true;
    }
  }

  // * Clear Pipes
  while (pipesArray.length > 0 && pipesArray[0].x < -pipesWidth) {
    pipesArray.shift(); // removes first pipes from the array
  }

  // * Score
  context.fillStyle = "white";
  context.font = "32px sans-serif";
  context.fillText(score, 5, 30);

  if (gameover) {
    context.fillStyle = "white";
    context.fillRect(40, 200, 300, 120);
    context.fillStyle = "red";
    context.font = "bold 40px sans-serif";
    context.fillText("GAME OVER", 65, 250);
    context.fillStyle = "black";
    context.font = "32px sans-serif";
    context.fillText("YOUE SCORE: " + score, 60, 300);
  }
}

function placePipes() {
  if (gameover) {
    return;
  }
  // pipesHeight / 4 = 512/4 = 128
  // (0 - 1) * pipesHeight/2
  // 0 -> -128
  // 1 -> -128 -(1 * 256) = -128 -256 = (-pipesHeight/4 - pipesHeight/2) = - 3/4 pipesHeight => 384

  let randomPipeY = pipeY - pipesHeight / 4 - Math.random() * (pipesHeight / 2);
  let openingSpace = pipesHeight / 4;

  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipesWidth,
    height: pipesHeight,
    passed: false,
  };
  pipesArray.push(topPipe);

  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipesHeight + openingSpace,
    width: pipesWidth,
    height: pipesHeight,
    passed: false,
  };
  pipesArray.push(bottomPipe);
}

function movebird(e) {
  if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyW") {
    // * JUMP BIRD
    velocityY = -5;

    // * RESET GAME
    if (gameover) {
      bird.y = birdY;
      pipesArray = [];
      score = 0;
      gameover = false;
    }
  }
}

function detectCllision(bird, pipe) {
  return (
    bird.x < pipe.x + pipe.width && //bird's top left corner doesn't reach pipe's top right corner
    bird.x + bird.width > pipe.x && //bird's top right corner passes pipe's top left corner
    bird.y < pipe.y + pipe.height && //bird's top left corner doesn't reach pipe's bottom left corner
    bird.y + bird.height > pipe.y //bird's bottom left corner passes pipe's top left corner
  );
}
