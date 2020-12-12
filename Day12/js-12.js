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





 

 /** DIRECTIONS, DEGREES, AXES
  * 
  *        N = (+y) = 0
  *             ▲
  *             |
  *             |
  *  W          |            E
  * -x ◀------- + --------▶ +x
  * 270         |           90
  *             |
  *             |
  *             |
  *             ▼
  *        S = (-y) = 180  
  * 
  * N =   0 = +y
  * E =  90 = +x
  * S = 180 = -y
  * W = 270 = -x
  */


const START_POS = [0,0]; //[EAST, NORTH] = [x,y]





const part1 = ([...input], startHeading) => {

  let currHeading = startHeading;
  let [x, y] = START_POS;


  const moveForwardAtCurrHeading = (value) => {
    switch(currHeading){
      case 0: 
        y += value;
        break;
      case 90: 
        x += value;
        break;
      case 180: 
        y -= value;
        break;
      case 270: 
        x -= value;
        break;
      default: 
      console.error(`Unexpeted Heading : ${currHeading}`);
    }
  };



  for (let [action, value] of input) {
    switch (action) {

      case "N":
        // Action N means to move north by the given value.
        y += value;
        break;
      case "S":
        // Action S means to move south by the given value.
        y -= value;
        break;
      case "E":
        // Action E means to move east by the given value.
        x += value;
        break;
      case "W":
        // Action W means to move west by the given value.
        x -= value;
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
        moveForwardAtCurrHeading(value);
        break;


      default:
        console.error(`Unexpected Action : {action}`);
        break;
    }
  }

  return {
    pos: [x, y],
    ManhattenDistance: Math.abs(y - START_POS[0]) + Math.abs(x - START_POS[1]),
  };
};

const START_HEADING = 90;
console.log("Part1", part1(input, START_HEADING));


// PART 2



const part2 = ([...input], wayPointLocation) => {

  let [way_x, way_y] = wayPointLocation;
  let [x, y] = START_POS;
  

  const rotateWayPoint = (deg)=>{
  // Assumes rotation is clockwise
  switch (deg) {
    case 0:
      break;
    case 90:
      [way_x, way_y] = [way_y, -way_x];
      break;
    case 180:
      [way_x, way_y] = [-way_x, -way_y];
      break;
    case 270:
      [way_x, way_y] = [-way_y, way_x];
      break;
    default:
      console.log(`Unexpected rotation degs: ${deg}`);
  }
}

  for (let [action, value] of input) {
    switch (action) {
      case "N":
        //Action N means to move the waypoint north by the given value.
        way_y += value;
        break;
      case "S":
        //Action S means to move the waypoint south by the given value.
        way_y -= value;
        break;
      case "E":
        //Action E means to move the waypoint east by the given value.
        way_x += value;
        break;
      case "W":
        // Action W means to move the waypoint west by the given value.
        way_x -= value;
        break;

      case "F":
        // Action F means to move forward to the waypoint a number of times equal to the given value.
        x += way_x * value;
        y += way_y * value;
        break;

      case "L":
        // Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
        rotateWayPoint((360-value)%360);
        break;
      case "R":
        // Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.
        rotateWayPoint(value);
        break;

      default:
         console.error(`Unexpected Action : {action}`);
        break;
    }
  }

  return {
    pos: [x,y],
    ManhattenDistance: Math.abs(x- START_POS[0]) + Math.abs(y - START_POS[1]),
  };
};

const WAY_POINT_START = [10,1];
console.log("Part2", part2(input, WAY_POINT_START));
