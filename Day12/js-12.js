/*
Rain Risk 
*/

const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString()
  .split("\r\n")
  .map(a=> [a[0],parseInt(a.substr(1))]);

// console.log(input)





 

 /** DIRECTIONS
  * N = 0
  * E = 90
  * S = 180
  * W = 270
  */




const START_POS = [0,0]; //[EAST, NORTH]




const part1 = ([...input], startHeading) => {

  let currHeading = startHeading;
  let [e, n] = START_POS;


  const moveForwardAtHeading = (value) => {
    switch(currHeading){
      case 0: 
        n += value;
        break;
      case 90: 
        e += value;
        break;
      case 180: 
        n -= value;
        break;
      case 270: 
        e -= value;
        break;
      default: 
      console.error("Unexpeted Heading");
    }
  };



  for (let [action, value] of input) {
    switch (action) {

      case "N":
        // Action N means to move north by the given value.
        n += value;
        break;
      case "S":
        // Action S means to move south by the given value.
        n -= value;
        break;
      case "E":
        // Action E means to move east by the given value.
        e += value;
        break;
      case "W":
        // Action W means to move west by the given value.
        e -= value;
        break;

      case "L":
        // Action L means to turn left the given number of degrees.
        currHeading = (currHeading + (360 - value)) % 360;
        break;
      case "R":
        // Action R means to turn right the given number of degrees.
        currHeading = (currHeading + value) % 360;
        break;

      case "F":
        //  Action F means to move forward by the given value in the direction the ship is currently facing.
        moveForwardAtHeading(value);
        break;


      default:
        console.error("Unexpected");
        break;
    }
  }

  return {
    pos: [e, n],
    ManhattenDistance: Math.abs(n - START_POS[0]) + Math.abs(e - START_POS[1]),
  };
};

const START_HEADING = 90;
console.log("Part1", part1(input, START_HEADING));


// PART 2



const part2 = ([...input], wayPoint) => {
  let currHeading = START_HEADING;
  let [e, n] = START_POS;
  let [way_e,way_n] = wayPoint;

  const applyRotation = (rotation)=>{
  // Assumes rotation is clockwise
  switch (rotation) {
    case 0:
      break;
    case 90:
      [way_e, way_n] = [way_n, -way_e];
      break;
    case 180:
      [way_e, way_n] = [-way_e, -way_n];
      break;
    case 270:
      [way_e, way_n] = [-way_n, way_e];
      break;
    default:
      console.log("Unexpected rotation");
  }
}

  for (let [action, value] of input) {
    switch (action) {
      case "N":
        //Action N means to move the waypoint north by the given value.
        way_n += value;
        break;
      case "S":
        //Action S means to move the waypoint south by the given value.
        way_n -= value;
        break;
      case "E":
        //Action E means to move the waypoint east by the given value.
        way_e += value;
        break;
      case "W":
        // Action W means to move the waypoint west by the given value.
        way_e -= value;
        break;

      case "F":
        // Action F means to move forward to the waypoint a number of times equal to the given value.
        e += way_e * value;
        n += way_n * value;
        break;

      case "L":
        // Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
        applyRotation((360-value)%360);
        break;
      case "R":
        // Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.
        applyRotation(value);
        break;

      default:
        console.error("Unexpected");
        break;
    }
  }

  return {
    pos: [e,n],
    ManhattenDistance: Math.abs(e- START_POS[0]) + Math.abs(n - START_POS[1]),
  };
};

const WAY_POINT_START = [10,1];
console.log("Part2", part2(input, WAY_POINT_START));
