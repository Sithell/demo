DELAY = 0;
WIDTH = 7;
DEPTH = 15;
WIDTH_REDUCTION = 1.5;

var delayed = [];
var stage = DEPTH;

function generateRandom() {
  ANGLE = random(15, 120);
  SHORTENING = random(5, 10) / 10;

  generate();
}

function download(){
		var download = document.getElementById("download");
		var image = document.getElementById("canvas").toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
		//download.setAttribute("download","archive.png");
}
function generate() {
  // Cancel all draw() function's calls
  for (var call = 0; call <= delayed.length; call++) {
    clearTimeout(delayed[call]);
  }

  // Dev purposes only, comment before deploy
  // document.getElementById("angle").innerHTML = ANGLE;
  // document.getElementById("shortening").innerHTML = SHORTENING;

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.closePath();
  context.stroke();
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Set scale
  if (SHORTENING == 1) {
    LENGTH = canvas.height / DEPTH;
  } else {
    LENGTH = canvas.height * (1 - SHORTENING) / (1 - SHORTENING ** DEPTH);
  }
  stage = DEPTH;
  context.beginPath();
  START_COLOR = getRandomInt(0, 360);
  // Draw roots
  ROOT_COUNT = random(2, 32);
  for (var i = 0; i < ROOT_COUNT; i++) {
    draw(context, canvas.width / 2, canvas.height / 2, -90 + i*360/ROOT_COUNT, DEPTH);
  }
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

  let color = hsvToRgb(((DEPTH - depth) * 20 + START_COLOR) % 360, 62, 86);
  // console.log(`rgba(${color.r}, ${color.g}, ${color.b}, 1)`);
  context.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;
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
