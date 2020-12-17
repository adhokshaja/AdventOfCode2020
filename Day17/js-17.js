/*
  Conway Cubes
*/

/*
 * specified active (#) or inactive (.) state.
 */
const fs = require("fs");

const input = fs
  .readFileSync("./day17/input.txt", (_, a) => a)
  .toString()
  .split("\r\n")
  .map((x) => x.split(""));

//#region Type Definitions

/**
 * A map of the space.
 * This map will hold the coordinates x,y,z as the key and a bool repreentation of active state as value.
 *
 * key = `${x},${y},${z},${w}`
 * @typedef {Map<string,bool} SpaceMap
 */
/**
 * Min max Value for a dimension
 * @typedef {[min:Number, max:Number]} DimensionBounds
 */

/**
 * Bounds for a space
 * @typedef {{ x:DimensionBounds, y:DimensionBounds, z:DimensionBounds, w:DimensionBounds }} SpaceBounds
 */

/**
 * Bounds for a space
 * @typedef {Object} State
 * @property {SpaceMap} map
 * @property {SpaceBounds} bounds
 */

 /**
 * Coordinates for a point
 * @typedef {[x:Number, y:Number, z:Number, w:Number]} Coordinates
 */

//#endregion


//#region  Helper Functions



 /**
  * Returns Initial state from input
  * @param {[[Number]]} input input grid
  */
const getInitialState = (input) => {
  const ACTIVE = "#";

  /**
   * @type {SpaceMap}
   */
  const space = new Map();

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[0].length; y++) {
      const currCoordinate = [x, y, 0, 0];
      space.set(getKeyFromCoords(currCoordinate), input[x][y] === ACTIVE);
    }
  }
  const bounds = {
    x: [0, input.length - 1],
    y: [0, input[0].length - 1],
    z: [0, 0],
    w: [0, 0],
  };

  return {
    bounds,
    map: space,
  };
};


/**
 * Returns Map Key from Coordinates
 * @param {Coordinates} coords 
 */
 const getKeyFromCoords = ([x, y, z, w]) => `${x},${y},${z},${w}`;


 /**
 * Generate a neighborCountingFunction for given map
 * @param {SpaceMap} spaceMap
 * @returns {(point:Coordinates)=>Number} Function to count the number of Active cubes neighboring a given point
 */
function GetActiveNeighborsCounter(spaceMap) {
  const dirs = [-1, 0, 1];
  
  return ([x, y, z, w]) => {
    let neighborsCount = 0;
    for (let dx of dirs) {
      for (let dy of dirs) {
        for (const dz of dirs) {
           for (const dw of dirs) {
             if (dx === 0 && dy === 0 && dz === 0 && dw === 0) {
               continue; // Skip self
             }
             if (spaceMap.get(getKeyFromCoords([x + dx, y + dy, z + dz, w + dw]))) {
               neighborsCount += 1;
             }
           }
        }
      }
    }
    return neighborsCount;
  };

}


/**
 * Performs one evolution of given state
 * @param {State} prevState Previous State
 * @param {Number} numDim Number of Dimensions to consider when evolving
 */
function evolve({map: prevMap,bounds}, numDim = 2) {
  let nextMap = new Map();
  let { x: xBounds, y: yBounds, z: zBounds, w: wBounds } = bounds;

  //Increase bounds by 1 in each direction
  //Decrease min by 1
  //increase max by 1

  xBounds[0] -= 1;
  xBounds[1] += 1;

  if (numDim >= 2) {
    yBounds[0] -= 1;
    yBounds[1] += 1;
  }

  if (numDim >= 3) {
    zBounds[0] -= 1;
    zBounds[1] += 1;
  }

  if (numDim >= 4) {
    wBounds[0] -= 1;
    wBounds[1] += 1;
  }

  const countActiveNeighborsInMap = GetActiveNeighborsCounter(prevMap);
  /*
   * If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
   * If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.
   */
  for (let w = wBounds[0]; w <= wBounds[1]; w++) {
    for (let z = zBounds[0]; z <= zBounds[1]; z++) {
      for (let y = yBounds[0]; y <= yBounds[1]; y++) {
        for (let x = xBounds[0]; x <= xBounds[1]; x++) {
          const currentCoords = [x, y, z, w];
          const activeNeighborsCount = countActiveNeighborsInMap(currentCoords);

          const currentCoordKey = getKeyFromCoords(currentCoords);
          const isActive = !!prevMap.get(currentCoordKey);

          if (
            isActive &&
            (activeNeighborsCount == 3 || activeNeighborsCount == 2)
          ) {
            // Active & exactly 2 or 3 of its neighbors are also active, the cube remains active.
            nextMap.set(currentCoordKey, true);
          } else if (!isActive && activeNeighborsCount == 3) {
            // inactive and exactly 3 active neighbors
            nextMap.set(currentCoordKey, true);
          }
        }
      }
    }
  }

  return {
    map: nextMap,
    bounds: { x: xBounds, y: yBounds, z: zBounds, w: wBounds },
  };
}


//#endregion


// PART 1

const Part1 = (input) => {
  const NUM_DIM = 3;
  const NUM_EVOLUTIONS = 6;

  let currState = getInitialState(input);
  for (let i = 1; i <= NUM_EVOLUTIONS; i++) {
    currState = evolve(currState, NUM_DIM);
  }

  return currState.map.size;
};

console.log("Part1 ", Part1(input));

// PART 2

const Part2 = (inputSpace) => {
  
  const NUM_DIM = 4;
  const NUM_EVOLUTIONS = 6;

  let currState = getInitialState(input);
  for (let i = 1; i <= NUM_EVOLUTIONS; i++) {
    currState = evolve(currState, NUM_DIM);
  }

  return currState.map.size;
};
console.log("Part2 : ", Part2(input));
