DELAY = 0;
WIDTH = 7;
DEPTH = 12;
WIDTH_REDUCTION = 1.7;

var delayed = [];

function generate() {
  // Cancel all draw() function's calls
  for (call in delayed) {
    clearTimeout(call);
  }

  ANGLE = random(15, 120);
  SHORTENING = random(10, 17) / 10;
  if (SHORTENING == 1) {
    LENGTH = 30;
  }
  else if (SHORTENING < 1.4) {
    LENGTH = 70;
  }
  else if (SHORTENING == 1.5) {
    LENGTH = 150;
  }
  else if (SHORTENING < 1.7) {
    LENGTH = 180;
  }
  else {
    LENGTH = 300;
  }

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  draw(context, canvas.width / 2, canvas.height / 2, -90, DEPTH);
  draw(context, canvas.width / 2, canvas.height / 2 - LENGTH / 2, 90, DEPTH);
}

function draw(context, x1, y1, angle, depth) {
  if (depth == 0) {
    return; // TODO Draw leaf
  }
  if (depth == DEPTH) {
    var width = 2; // TODO refactor
  }
  else {
    var width = WIDTH / WIDTH_REDUCTION ** (DEPTH - depth + 1);
  }
  var length = LENGTH / SHORTENING ** (DEPTH - depth + 1);
  var x2 = x1 + cos(angle) * length;
  var y2 = y1 + sin(angle) * length;

  context.beginPath();
  context.strokeStyle = "#000000";
  context.lineWidth = width;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.closePath();
  context.stroke();

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
