DELAY = 0;

function generate() {
  // var setIndex = random(0, sets.length - 1);
  // ANGLE = sets[setIndex]['angle'];
  // SHORTENING = sets[setIndex]['shortening'];
  // LENGTH = sets[setIndex]['length'];
  // DEPTH = sets[setIndex]['depth'];
  DEPTH = random(8, 10);
  ANGLE = random(0, 180);
  SHORTENING = random(10, 20) / 10;
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
  draw(context, canvas.width / 2, canvas.height / 2, 90, DEPTH);
  // draw(context, canvas.width / 2, canvas.height / 2, -210, DEPTH);
}

function draw(context, x1, y1, angle, depth) {
  if (depth == 0) {
    return; // TODO Draw leaf
  }
  var length = LENGTH / SHORTENING ** (DEPTH - depth + 1);

  var x2 = x1 + cos(angle) * length;
  var y2 = y1 + sin(angle) * length;

  context.beginPath();
  context.strokeStyle = "#000000";
  context.width = 5;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.closePath();
  context.stroke();

  setTimeout(function() {
    draw(context, x2, y2, angle + ANGLE, depth - 1);
  }, DELAY)
  setTimeout(function() {
    draw(context, x2, y2, angle - ANGLE, depth - 1);
  }, DELAY)
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
