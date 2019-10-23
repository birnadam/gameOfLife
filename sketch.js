// function to create a 2d array given an input of columns and rows
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

// variables
let grid;
let cols;
let rows;
let resolution = 10;

// initializing p5's canvas and forming the grid based off of those dimensions
function setup() {
  createCanvas(400, 600);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(255); // white cell shows that the cell's state is at 0 (dead)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) { 
        fill(55, 55, 255, 100); // indigo cell shows that the cell's state is at 1 (alive)
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  // traces the canvas with a black grid outline so 
  // it's easier to tell which cells are dead vs alive
  for (var x = 0; x < width; x += width / 40) {
		for (var y = 0; y < height; y += height / 60) {
			stroke(0);
			strokeWeight(1);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
	}

  let next = make2DArray(cols, rows);

  // compute next state 
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // count live neighbors
      let neighbors = countNeighbors(grid, i, j);

      // enforce the rules in which a state is changed 
      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  grid = next;
}

// function to count living neighbor cells
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}