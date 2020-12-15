/*
  Rambunctious Recitation
*/

const fs = require("fs");


const input = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString()
  .split("\r\n")
  .map((a) => a.split(','))[0].map(a=>a >>>0);


/**
 * Enumerates rules and returns the number at the stopAt turn
 * @param {[Number]} input Starting Set of Numbers
 * @param {Number} stopAt  Number at which to stop the iterations
 * @returns Value when stopped
 * @description Uses a Naive loop and array based approach with costly lookups. 
 * Works well for small inputs. Speaking a number is easy : just add it to the array. The array is a dictionary i:turn number and the spoken number
 */
const enumerateByRule_bruteforce = ([...input],stopAt) => {
  const spoken = [];

  for (i in input) {
    spoken[i] = { i: 1 + parseInt(i),  spoken: input[i] };
  }

  for (let i = input.length; i < stopAt; i++) {
    lastSpoken = spoken[i - 1].spoken;

    // Find the number to be actually spoken
    let actualSpoken = lastSpoken;
    previouslySpoken = spoken.filter((x) => x.spoken == lastSpoken);

    if (previouslySpoken.length > 1) {
      prevInd = previouslySpoken.slice(-2)[0].i;
      actualSpoken = i - prevInd;
    } else if (previouslySpoken.length > 0) {
      actualSpoken = 0;
    }

    // speak the number
    spoken[i] = { i: i + 1,  spoken: actualSpoken };

  }
  return spoken.slice(-1)[0].spoken;
};

console.time("Part1 - bruteForce algo");
var p1_bf = enumerateByRule_bruteforce(input, 2020);
console.timeEnd("Part1 - bruteForce algo");
console.log("Part1 - BF: ", p1_bf);

/**
 * Enumerates rules and returns the number at the stopAt turn
 * @param {[Number]} input Starting Set of Numbers
 * @param {Number} stopAt  Number at which to stop the iterations
 * @returns Value when stopped
 * @description Uses a hashmap lookup table with keys being the spoken numbers. This should speed up the enumeration for larger stopAt numbers.
 * The values are a dictionary with index: the last index this number was spoken; prevIndex: index prior to the last index the number was spoken.
 * The speak part of this method is a little more involved, since "speaking the number" equates to updating the hashmap.   
 */
const enumerateByRule_hashmap = ([...input], stopAt) => {
  
  const spoken = new Map();


  
  for (i in input) {

    spoken.set(input[i], { index: 1 + parseInt(i), prevIndex: null });
  }

  let lastSpoken = input[input.length-1];

  for (let i = input.length; i < stopAt; i++) {
    
    //Get number Actual spoken
    let actualSpoken = lastSpoken;
    let { index, prevIndex } = spoken.get(lastSpoken);
    if (prevIndex == null) {
      actualSpoken = 0;
    } else {
      actualSpoken = index - prevIndex;
    }

    //Speak number

    if (spoken.has(actualSpoken)) {
      //actualSpokenNumber was already spoken, update hash map by setting index to current and prevIndex to the original index
      let { index: orig_index } = spoken.get(actualSpoken);

      spoken.set(actualSpoken, {
        index: 1 + parseInt(i),
        prevIndex: orig_index,
      });
    } 
    else {
      // add actuallySpoken number to the has map with index as current
      spoken.set(actualSpoken, { index: 1 + parseInt(i), prevIndex: null });
    }
    lastSpoken = actualSpoken;


  }

  return lastSpoken;
};

// PART 1
console.time("Part1 - hashmap algo");
var p1_hm = enumerateByRule_hashmap(input, 2020);
console.timeEnd("Part1 - hashmap algo");
console.log("Part1 hashmap ", p1_hm);
// PART 2

//console.log("Part2 : ", enumerateByRule_hashmap(input, 30000000));
