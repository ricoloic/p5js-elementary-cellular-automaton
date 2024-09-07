const rule = 30;
const rules = rule
  .toString(2)
  .padStart(8, '0')
  .split('')
  .map((e) => parseInt(e));
const map = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1],
  [1, 0, 0],
  [0, 1, 1],
  [0, 1, 0],
  [0, 0, 1],
  [0, 0, 0]
];
const colors = ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226"];
const scl = 5;

let cells = [];
let generation = 0;

function generate() {
  generation++;
  const next = Array.from({ length: cells.length })
  for (let i = 0; i < cells.length; i++) {
    const left = i === 0 ? 0 : cells[i - 1];
    const middle = cells[i];
    const right = i === cells.length - 1 ? 0 : cells[i + 1];

    const index = map.findIndex(([a, b, c]) => a === left && b === middle && c === right);
    next[i] = rules[index];

    fill(colors[index]);
    rect(i * scl, generation * scl - scl, scl, scl);
  }

  cells = next;
}

function setup() {
  const canvas = document.querySelector('canvas');
  if (canvas) canvas.remove();
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(15);
  noStroke();

  for (let i = 0; i < width / scl; i++) {
    cells[i] = 0;
  }
  cells[floor(cells.length / 2)] = 1;

  background(255);
}


function draw() {
  generate();
}
