const cols = 50;
const rows = 50;
const grid = new Array(cols);
let openSet = [];
let closeSet = [];
let start;
let end;
let w, h;
let path = [];
let newPath = false;
Array.prototype.remove = function(element) {
  for (let i = this.length - 1; i >= 0; i--) {
    if (this[i] === element) {
      this.splice(i, 1);
    }
  }
};

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  w = width / cols;
  h = height / rows;
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  // Add the neighbors of each node
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  // Set the start and end node
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  // The start and end never should be a wall
  start.wall = false;
  end.wall = false;
  openSet.push(start);
}

function draw() {
  if (openSet.length > 0) {
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      // Pick the node with the lowest f
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    // The node in the openset with the lowest fscore() value
    var current = openSet[winner];
    if (current === end) {
      // Reconstruct path
      console.log('DONE!');
      noLoop();
    }

    openSet.remove(current);
    closeSet.push(current);

    const neighbors = current.neighbors;
    for (let neighbor of neighbors) {
      if (!closeSet.includes(neighbor) && !neighbor.wall) {
        let tempG = neighbor.g + heuristic(neighbor, current);

        // If the node has been evaluated previously
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
          newPath = true;
        }
        // Calculate Heuristic
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  } else {
    console.log('No Solution');
    noLoop();
    return;
  }
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }
  //for (let s of openSet) s.show(color(0, 255, 0));
  //for (let s of closeSet) s.show(color(255, 0, 0));
  path = [];
  let temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
  noFill();
  stroke(255, 0, 200);
  strokeWeight(w / 2);
  beginShape();
  for (let s of path) {
    vertex(s.i * w + w / 2, s.j * h + h / 2);
    //s.show(color(0, 0, 255))
  }
  endShape();
}

// An educated guess of how far it is between two points
function heuristic(a, b) {
  // Euclidean distance
  let d = dist(a.i, a.j, b.i, b.j);

  // Manhatan distance
  // let d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}
