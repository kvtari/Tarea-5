/**
 *
 *  Campo de Noise con Espirales Cercanas para Cada Partícula
 *
 */

let particles;
let bg;
let zoomInput;
let angular;
let separation; // Distancia de separación entre partículas

function setup() {
  createCanvas(windowWidth, windowHeight);
  particles = [];
  separation = 5; // Ajusta la distancia de separación en milímetros

  zoomInput = createInput(100, "number");
  zoomInput.position(10, height - 58);
  zoomInput.size(80);
  zoomInput.changed(regen);

  angular = createCheckbox("Angular", false);
  angular.position(120, height - 46);

  // Crear 500 partículas
  for (let i = 0; i < 500; i++) {
    // Ajustar la posición inicial para que estén más cerca
    let x = width / 2 + cos(i * 0.05) * separation * i;
    let y = height / 2 + sin(i * 0.05) * separation * i;
    let p = new Patricle(x, y);
    particles.push(p);
  }
  regen();
  background(0);
}

function regen() {
  let r = 5;
  bg = createGraphics(width, height);
  for (let y = 0; y < height; y += r) {
    for (let x = 0; x < width; x += r) {
      let n = noise(x / zoomInput.value(), y / zoomInput.value()) * 255;
      bg.fill(n);
      bg.noStroke();
      bg.rect(x, y, r, r);
    }
  }
}

function draw() {
  blendMode(SCREEN);

  for (let p of particles) {
    p.move();
    p.draw();
  }

  blendMode(BLEND);
  noStroke();
  fill(0, 10);
  rect(0, 0, width, height);
}

class Patricle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0; // Ángulo inicial en 0
    this.age = 0;
    this.maxAge = random(300, 600);
    this.col = color(255, 182, 193);
  }

  move() {
    // Ajustar el ángulo para crear una espiral
    this.angle += radians(5);

    if (angular.checked()) {
      this.angle = round(this.angle);
    }

    this.x = this.x + cos(this.angle) * separation;
    this.y = this.y + sin(this.angle) * separation;

    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;

    this.age++;
    if (this.age > this.maxAge) {
      this.x = random(width);
      this.y = random(height);
      this.angle = 0;
      this.age = 0;
    }
  }

  draw() {
    let currentCol = lerpColor(this.col, color(0, 0), this.age / this.maxAge);
    stroke(currentCol);
    strokeWeight(5);
    point(this.x, this.y);
  }
}

const colorPaletteArray = [
  "#4a019355",
  "#55049155",
  "#60098f55",
  "#6a0e8c55",
  "#74138855",
  "#7d188255",
  "#861d7c55",
  "#8e227655",
  "#96266f55",
  "#9e2b6755",
  "#a52f5f55",
  "#ac355555",
  "#b13b4c55",
  "#b6424355",
  "#ba493a55",
  "#bd503155",
  "#c0572855",
  "#c15f1f55",
  "#c1681455",
  "#c1700855",
  "#bf790055",
  "#bb820055",
  "#b78b0055",
  "#b2940155",
];