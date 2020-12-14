/*
Rain Risk 
*/

const fs = require("fs");
const { env } = require("process");

//how often the bus leaves for the airport.
//Bus schedules are defined based on a timestamp that measures the number of minutes since some fixed reference point in the past. 


//The first line is your estimate of the earliest timestamp you could depart on a bus.


/*
The second line lists the bus IDs that are in service according to the shuttle company; 
entries that show x must be out of service, so you decide to ignore them.
*/
console.log(env.PWD)
const input = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString()
  .split("\r\n")
  .map(a=> a);

// console.log(input)

//Find the earliest bus you can take to the airport.
//What is the ID of the earliest bus you can take to the airport multiplied by the number of minutes you'll need to wait for that bus?
const part1 = ([...input]) => {

  const EstimateArrival = parseInt(input[0]);
  const Shuttles = input[1].split(',').filter(a =>a !='x').map(a=>parseInt(a));
  
  const timeDiff = Shuttles.map( a=> {
    const match = Math.ceil(EstimateArrival/a);
      return {
        id:a, 
        match,
        timeDiff: (match*a)-EstimateArrival}
      }
  ).sort((a,b)=> a.timeDiff-b.timeDiff);

  return timeDiff[0].id * timeDiff[0].timeDiff;
};

console.log("Part1: ", part1(input));


// PART 2


// Some helper functions

/** Helper Function ported from AoC19 (https://github.com/adhokshaja/AdventOfCode2019/blob/master/MathHelpers.js), slightly refactored
 * Finds the Greatest Common Divisor of the given array of numbers
 * @param {[Number]} param0 Input array
 */
function GCD (n1, n2, ...others){
    if(!n1 || !n2) {
      return n1||n2;
    }
    let x = Math.abs(n1),
        y = Math.abs(n2);
    while (y) {
        let temp = y;
        y = x % y;
        x = temp;
    } 
    if(others.length<=0){
        return x;
    }

    return GCD(x,...others);  
}


/**
 * Chinese Reminder Theorem - Solve system of Congruences using  
 * @param {[{mod:Number,rem:number}]} eqns Representation of the system of congrugencies
 */
function solveSimultaneousCongruences(eqns){

  const eqns_sorted = eqns.sort((a,b)=> b.mod - a.mod);

  // Chinese Reminder Theorem
  // Solution using Sieving (https://en.wikipedia.org/wiki/Chinese_remainder_theorem#Search_by_sieving)

  let acc = eqns_sorted[0].rem;
  let currMultiple = 1;

  for (let i = 1; i < eqns_sorted.length; i++) {
    const { mod: prevMod } = eqns_sorted[i - 1];
    currMultiple = prevMod * currMultiple/ GCD(prevMod, currMultiple);

    const { mod, rem } = eqns_sorted[i];
   
    while (acc % mod != rem) {
      acc += currMultiple;
    }

  }

  return acc;
}



//find the earliest timestamp such that the first bus ID departs at that time and each subsequent listed bus ID departs at that subsequent minute.

const part2 = ([...input]) => {
  const Shuttles = input[1].split(",");

  const subsequentShuttles = [];

  for (let x of Shuttles.entries()) {
    const [i,shuttle] = x;
    if (!isNaN(shuttle)) {
      const currentShuttle = parseInt(shuttle);
      subsequentShuttles.push({
        lagTime: (currentShuttle - (i % currentShuttle)) % currentShuttle,
        shuttle: currentShuttle,
      });
    }
    
  }

 console.log(`The answer "t" is the solution to the simultaneous congruencies : \n${subsequentShuttles.map(a => `t ≡ ${a.lagTime} (mod ${a.shuttle})`).join("\n")}`);

  const timeStamp = solveSimultaneousCongruences(subsequentShuttles.map( a=> {return {rem:a.lagTime, mod:a.shuttle}}))

  return timeStamp;
};


console.log("Part2 : ", part2(input)); 
