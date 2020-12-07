const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString()
  .split("\r\n")
  .map( line => line.split(''));

/**
 * Creates a tree counter for given topo map
 * @param {[[string]]} topoMap 
 */
const treeCounterForTopoMap = (topoMap,{startX,startY}={startX:0,startY:0}) => {
  // Infinite repetations on left and right
  // Start at top left. Count how many trees (#) we encounter 
  return ([right, down] = [3, 1])=> {
    let x = startX,
      y = startY,
      trees = 0;
    const rows = topoMap.length;
    const columns = topoMap[0].length;
    while (y < rows) {
      if (topoMap[y][x] == "#") {
        trees += 1;
      }
      //move right , account for repetations
      x = (x + right) % columns;
      //move down
      y += down;
    }
    return trees;
  }
}
const p1 = treeCounterForTopoMap(input)([3, 1]);
console.log("Part 1", p1);

/**
 *  * checks the slopes and returns back a single value based on filter and reduce functions. Can be used as a cost function
 * @param {([right,down]:[number, number])=> number} treeCounter 
 * @param {[[number, number]]} slopesToCheck an array of slopes. Slopes are of the form [right,down]
 * @param {{initialValue:number, reductionFunc:(accumulatedVaue:number, currentCount:number)=>number}} param2
 * @param {(treeCount:number)=>boolean} filterFunc

 */
const slopesChecker = (treeCounter, slopesToCheck, {initialValue=0,reductionFunc = (_,a)=>a}, filterFunc = _=>true)=>{
  const treesInEachSlope = slopesToCheck.map(treeCounter);
  //console.log(treesInEachSlope);
  return treesInEachSlope.filter(filterFunc).reduce(reductionFunc,initialValue);
}

//P2
var slopesToCheck = [
  [1,1],
  [3,1],
  [5,1],
  [7,1],
  [1,2]
];

var p2 = slopesChecker(treeCounterForTopoMap(input), slopesToCheck, {
  initialValue: 1,
  reductionFunc: (a, b) => a * b,
});
console.log("Part 2",p2);