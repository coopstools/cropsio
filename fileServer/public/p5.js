var firstCrop;

function setup() {
    createCanvas(600, 600);
    firstCrop = new Crop();
}

function draw() {
    background(0);
    firstCrop.show();
    global.mouseX = mouseX;
    global.mouseY = mouseY;
}
