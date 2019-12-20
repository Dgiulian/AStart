class Spot {
  constructor(i, j) {
    // Location
    this.i = i;
    this.j = j;

    // f,g and h values of A*
    this.f = 0;
    this.g = 0;
    this.h = 0;
    // Neighbors
    this.neighbors = [];
    // Is this a wall?
    this.wall = random(1) < 0.3;
    // Reference to the previous node
    this.previous = null;
  }
  show(color) {
    if (this.wall) {
      fill(0);
    } else {
      fill(color);
    }
    noStroke();
    if (this.wall) {
      ellipse(this.i * w, this.j * h, w / 2, h / 2);
    } else {
      rect(this.i * w, this.j * h, w - 1, h - 1);
    }
  }
  addNeighbors = function(grid) {
    let { i, j } = this;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    // Diagonals
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }

    // Diagonals avoiding neighbor walls
    // If both neighbors are walls, it can't use the diagonal.
    /*     if (i > 0 && j > 0) {
      if(!grid[i - 1][j].wall && !grid[i][j - 1].wall) {
        this.neighbors.push(grid[i - 1][j - 1]);
      }
    }
    if (i < cols - 1 && j > 0) {
      if(!grid[i][j - 1].wall && grid[i + 1][j].wall){
        this.neighbors.push(grid[i + 1][j - 1]);
      }
    }
    if (i > 0 && j < rows - 1) {
      if(!grid[i - 1][j ].wall && grid[i][j + 1].wall) {
        this.neighbors.push(grid[i - 1][j + 1]);
      }
    }
    if (i < cols - 1 && j < rows - 1) {
      if(!grid[i + 1][j].wall && grid[i][j + 1].wall) {
        this.neighbors.push(grid[i + 1][j + 1]);

      }
    } */
  };
}
