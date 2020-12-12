/*
. is floor
L is empty seat
# occupied seat


All decisions are based on the number of occupied seats adjacent to a given seat 
(one of the eight positions immediately up, down, left, right, or diagonal from the seat). 
The following rules are applied to every seat simultaneously:
If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.
Floor never changes
*/

const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString()
  .split("\r\n")
  .map((a) => a.split(""));

//console.log(input)


function findNeighbors(grid, is_p1 = true) {
  
  const maxX = grid.length;
  const maxY = grid[0].length;

  return (startIndex) => {
    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    const neighbors = [];

    for (const [dx, dy] of dirs) {
      let [x, y] = startIndex;
      x += dx;
      y += dy;

      if (is_p1) {
        neighbors.push(grid[x][y]);
        continue;
      }

      //Part 2
      while (x > 0 && x < maxX && y > 0 && y < maxY) {
        if (grid[x][y] != ".") {
          neighbors.push(grid[x][y]);
          break;
        }
        x += dx;
        y += dy;
      }

    }
    return neighbors;
  };
}

//Simulate one evolution of seating area by applying the seating rules repeatedly until no seats change state.


function evolve(currGrid, is_p1) {
  let nextGrid = JSON.parse(JSON.stringify(currGrid));

  let didChange = false;
  const findNeighborsInGrid = findNeighbors(currGrid, is_p1);

  const occupiedSeatsThreshold = is_p1 ? 4 :5;

  for (let x = 1; x < currGrid.length - 1; x++) {
    for (let y = 1; y < currGrid[0].length - 1; y++) {
      
      const neighbors = findNeighborsInGrid([x, y]);
      const occupiedSeats = neighbors.filter((a) => a == "#").length;

      // If a seat is empty (L)
      if (currGrid[x][y] == "L") {
        //and there are no occupied seats adjacent to it, the seat becomes occupied (#).
        if (occupiedSeats == 0) {
          nextGrid[x][y] = "#";
          didChange = true;
        }
      }


      //If a seat is occupied (#)
      if (currGrid[x][y] == "#") {
        //and threshold or more seats adjacent to it are also occupied, the seat becomes empty(L).
        if (occupiedSeats >= occupiedSeatsThreshold) {
          nextGrid[x][y] = "L";
          didChange = true;
        }
      }

    }
  }
  return {
    nextGrid,
    didChange,
  };
}



const part1 = ([...grid]) => {
  const gridRow1 = grid[0].map((_) => ".");
  let currState = [gridRow1, ...grid, gridRow1].map((a) => [".", ...a, "."]);

  while (true) {
    const { nextGrid, didChange } = evolve(currState, true);
    currState = JSON.parse(JSON.stringify(nextGrid)); // deep copy
    if (!didChange) {
      return currState
        .map((a) => a.filter((x) => x == "#").length)
        .reduce((a, b) => a + b, 0);
    }
  }
};

console.log("Part1", part1(input));


const part2 = ([...grid]) => {
  const gridRow1 = grid[0].map((_) => ".");
  let currState = [gridRow1, ...grid, gridRow1].map((a) => [".", ...a, "."]);

  while (true) {
    const { nextGrid, didChange } = evolve(currState, false);
    currState = JSON.parse(JSON.stringify(nextGrid)); // deep copy
    if (!didChange) {
      return currState
        .map((a) => a.filter((x) => x == "#").length)
        .reduce((a, b) => a + b, 0);
    }
  }
};

console.log("Part2", part2(input));
