/*
Adapter Array 

output joltage (puzzle input)
Given adapter can take an input 1, 2, or 3 jolts lower than its rating and still produce its rated output joltage.
your device has a built-in joltage adapter rated for 3 jolts higher than the highest-rated adapter in your bag. 

charging outlet near your seat as having an effective joltage rating of 0.


What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?
*/

const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString()
  .split("\r\n")
  .map((a) => parseInt(a));



const part1 = ([...joltages]) => {
  
  let sortedJoltages = joltages.sort((a,b)=> a-b);
  let deviceJoltage = Math.max(...sortedJoltages) +3;
  sortedJoltages.push(deviceJoltage);
  let currJoltage = 0;
  let joltageDistribution = {
    1:0,3:0,2:0
  };

  for(let joltage of sortedJoltages){
    var difference = joltage - currJoltage;
    joltageDistribution[difference] += 1;
    currJoltage = joltage;
  }

  return  joltageDistribution[1] * joltageDistribution[3];
  

};

console.log("Part1", part1(input));

const part2 = ([...joltages]) => {

let deviceJoltage = Math.max(...joltages) + 3;
let joltageSet = new Set([deviceJoltage, ...joltages]);

const stepsToJoltage =[];
// stepsToJoltage[0] = 0; ignoring zero index for sanity
stepsToJoltage[1] = joltageSet.has(1) ? 1 : 0;
stepsToJoltage[2] = joltageSet.has(2) ? stepsToJoltage[1] + 1 : 0;
stepsToJoltage[3] = joltageSet.has(3) ? stepsToJoltage[1] + stepsToJoltage[2] + 1 : 0;

for (let i = 4; i <= deviceJoltage; i++) {
  stepsToJoltage[i] = joltageSet.has(i) ? (stepsToJoltage[i - 3] + stepsToJoltage[i - 2] + stepsToJoltage[i - 1] ): 0;
}
  return stepsToJoltage[deviceJoltage];

};

console.log("Part2", part2(input));
