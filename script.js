
function generate() {
  DEPTH = Number(document.getElementById('depth').value);
  ANGLE = Number(document.getElementById('angle').value);
  SHORTENING = Number(document.getElementById('shortening').value);
  LENGTH = Number(document.getElementById('length').value);

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw(context, canvas.width / 2, canvas.height / 2 - LENGTH / 2, 90, DEPTH);
  draw(context, canvas.width / 2, canvas.height / 2 + (LENGTH / 4), -90, DEPTH);
  draw(context, canvas.width / 2, canvas.height / 2 - (LENGTH / 4), 90, DEPTH);
}

function draw(context, x1, y1, angle, depth) {
  if (depth == 0) {
    return; // TODO Draw leaf
  }
  var length = LENGTH / SHORTENING ** (DEPTH - depth + 1);
  // var length = LENGTH;
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
  }, 1)
  setTimeout(function() {
    draw(context, x2, y2, angle - ANGLE, depth - 1);
  }, 1)
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
