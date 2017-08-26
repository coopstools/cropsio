var firstCrop;
players = {};

function setup() {
    createCanvas(600, 600);
    firstCrop = new Crop();
}

function draw() {
    background(0);
    drawGrid();
    for (var key in players) {
      if (players.hasOwnProperty(key)) {
        players[key].show();
      }
    }
    firstCrop.show();
}

var drawGrid = function() {

  fill(color('#00FF00'));
  for (var i = 0; i < 11; i++) {
    drawTwoLines(i*(2*ratio)*tileRadius)
  }
};

var drawTwoLines = function(yOffset) {

  for (var i = 0; i < numTiles; i++) {
    push();
    translate(tileRadius + 3 * tileRadius * i, yOffset);
    hexagon(0, tileRadius, tileRadius, 6);
    pop();
  }
  for (var i = 0; i < numTiles - 1; i++) {
    push();
    translate(2.5 * tileRadius + 3 * tileRadius * i, tileRadius * ratio + yOffset);
    hexagon(0, tileRadius, tileRadius, 6);
    pop();
  }
}

var coses = function() {
  var values = [];
  for (var a = 0; a < 6.28; a += angle) {
    values.push(Math.cos(a) * tileRadius);
  }
  return values;
}(); //x positions at 60 degree intervals
var sines = function() {
  var values = [];
  for (var a = 0; a < 6.28; a += angle) {
    values.push(Math.sin(a) * tileRadius);
  }
  return values;
}(); //y positions at 60 degree intervals

var hexagon = function(x, y) {
  beginShape();
  for (var i = 0; i < 6; i++) {
    var sx = x + coses[i];
    var sy = y + sines[i];
    vertex(sx, sy);
  }
  endShape(CLOSE);
};
