DELAY = 0;
WIDTH = 7;
DEPTH = 21;
WIDTH_REDUCTION = 1.5;

var delayed = [];
var stage = DEPTH;

function generateRandom() {
  ANGLE = random(15, 120);
  SHORTENING = random(5, 10) / 10;

  generate();
}

function generatePreset() {
  // TODO load presets from file
  // Caution! Observe random() indexes
  ANGLE = [20, 30, 45, 45, 60, 60, 68, 120][random(0, 7)];
  SHORTENING = [0.9, 0.9, 0.8, 0.6][random(0, 3)];

  generate();
}
function generate() {
  // Cancel all draw() function's calls
  for (var call = 0; call <= delayed.length; call++) {
    clearTimeout(delayed[call]);
  }

  // Dev purposes only, comment before deploy
  document.getElementById("angle").innerHTML = ANGLE;
  document.getElementById("shortening").innerHTML = SHORTENING;

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.closePath();
  context.stroke();
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Set scale
  LENGTH = canvas.height * (1 - SHORTENING) / (1 - SHORTENING ** DEPTH);
  stage = DEPTH;
  context.beginPath();
  draw(context, canvas.width / 2, canvas.height / 2 + LENGTH * SHORTENING / 2, -90, DEPTH);
  draw(context, canvas.width / 2, canvas.height / 2 - LENGTH * SHORTENING / 2, 90, DEPTH);
}

function draw(context, x1, y1, angle, depth) {
  if (depth < stage) {
    stage = depth;
    context.closePath();
    context.stroke();
    if (depth != 0) {
      context.beginPath();
    }
  }

  if (depth == 0) {
    return;
  }

  if (depth == DEPTH) {
    var width = 2; // TODO refactor
  }
  else {
    var width = WIDTH / WIDTH_REDUCTION ** (DEPTH - depth + 1);
  }
  var length = LENGTH * SHORTENING ** (DEPTH - depth + 1);
  var x2 = x1 + cos(angle) * length;
  var y2 = y1 + sin(angle) * length;

  context.strokeStyle = "#000000";
  context.lineWidth = width;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);

  // Draw 2 child branches with opposite angles
  delayed.push(setTimeout(function() {
    draw(context, x2, y2, angle + ANGLE, depth - 1);
  }, DELAY));
  delayed.push(setTimeout(function() {
    draw(context, x2, y2, angle - ANGLE, depth - 1);
  }, DELAY));
}

function sin(angle) { // angle in degrees
  return Math.sin(toRadians(angle));
}

function cos(angle) { // angle in degrees
  return Math.cos(toRadians(angle));
}

function toRadians(angle) { // convert degrees to radians
  return angle * (Math.PI / 180);
}

function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}
