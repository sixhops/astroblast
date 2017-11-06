const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 800;
const TANK_MOVE_RATE = 4;
const TANK_TOP = 510;

var tankPos = CANVAS_WIDTH / 2;

var canvas = null;
var ctx = null;
var tankSprite = null;
var aBigSprite = null;
var aSmallSprite = null;
var explodeSprite = null;
var asteroids = [];
var score = 0;
var playerMove = 0;
var gameOver = false;
var gameInterval = null;

function makeAsteroids(num) {
  var newAstro = {};
  var newRoids = [];
  for (let i = 0; i < num; i++) {
    newAstro = {};
    let xPos = Math.floor(Math.random() * CANVAS_WIDTH);
    let yPos = Math.floor(Math.random() * -100) - 200;
    // let xVel = Math.floor(Math.random() * 2) - 1;
    let xVel = 0;
    let yVel = Math.floor(Math.random() * 2) + 1;
    let random = Math.floor(Math.random() * 5);
    switch (random) {
      case 0:
      case 1:
      case 2:
        newAstro = {
          size: 60,
          pos: {x: xPos, y: -100},
          vel: {x: xVel, y: yVel},
          img: aSmallSprite
        };
        break;
      case 3:
      case 4:
        newAstro = {
          size: 160,
          pos: {x: xPos, y: -200},
          vel: {x: xVel, y: yVel},
          img: aBigSprite
        };
        break;
    }
    newRoids.push(newAstro);
  }
  return newRoids;
}

function updateAstroPos() {
  asteroids.forEach(function(roid) {
    roid.pos.x += roid.vel.x;
    roid.pos.y += roid.vel.y;
  });
}

function updatePlayerPos() {
  if (playerMove === -1) {
    tankPos -= TANK_MOVE_RATE;
  } else if (playerMove === 1) {
    tankPos += TANK_MOVE_RATE;
  } else {
    tankPos = tankPos;
  }
}

function clearRoids() {
  asteroids.forEach(function(roid) {
    ctx.clearRect(roid.pos.x - 1, roid.pos.y - 1, roid.size + 1, roid.size + 1);
  });
}
function drawRoids() {
  asteroids.forEach(function(roid) {
    ctx.drawImage(roid.img, roid.pos.x, roid.pos.y);
  });
}
function clearPlayer() {
  ctx.clearRect(tankPos, TANK_TOP, 101, 101);
}
function drawPlayer() {
  ctx.drawImage(tankSprite, tankPos, TANK_TOP);
}

function gameLoop() {
  if (!gameOver) {
    clearRoids();
    clearPlayer();
    updateAstroPos();
    updatePlayerPos();
    // check for collisions would go here
    drawRoids();
    drawPlayer();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  //code and events go here
  canvas = document.getElementById('gameview');
  ctx = canvas.getContext('2d');
  //ctx.fillStyle = "black";
  //ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  tankSprite = document.getElementById('tanksprite');
  aBigSprite = document.getElementById('abigsprite');
  aSmallSprite = document.getElementById('asmallsprite');
  explodeSprite = document.getElementById('explodesprite');

  document.onkeydown = function(e) {
    if (e.keyCode == '37') {
      // left arrow
      playerMove = -1;
    } else if (e.keyCode == '39') {
      // right arrow
      playerMove = 1;
    } else {
      playerMove = 0;
    }
  };
  document.onkeyup = function(e) {
    if (e.keyCode == '37' || e.keyCode == '39') {
      playerMove = 0;
    }
  };

  //debugger;
  document.getElementById('end').addEventListener('click', function() {
    gameOver = true;
  });
  document.getElementById('more').addEventListener('click', function() {
    asteroids = asteroids.concat( makeAsteroids(5) );
  });

  asteroids = asteroids.concat(makeAsteroids(6));
  gameInterval = setInterval(gameLoop, 10);

});
