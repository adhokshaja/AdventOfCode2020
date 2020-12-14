/*

Docking Data 
*/

const fs = require("fs");

/*

Bitmask system

can either update the bitmask or write a value to memory.
The bitmask is always given as a string of 36 bits, 
written with the MSB on the left and the LSB on the right. 
X -> unchanged 1,0->  overwrite
*/

const input = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString()
  .split("\r\n")
  .map((a) => a);

//

function parseMask(mask) {
  return mask.split("").map((b, i) => {
    return { i, b };
  });
}

function applyMaskToValue(mask, val) {
  let modBinStr = (val >>> 0).toString(2);
  modBinStr = modBinStr.padStart(36, "0").split("");

  for (let m of mask) {
    const { i, b } = m;
    if (b == "X") {
      continue;
    }

    modBinStr[i] = b.toString();
  }

  return parseInt(modBinStr.join(""), 2);
}

const part1 = ([...input]) => {
  const memory = {};
  let currentMask = [{}];
  for (let line of input) {
    const [inst, val] = line.split(" = ");
    if (inst.toLowerCase() == "mask") {
      currentMask = parseMask(val);
    } else {
      const memoryAddress = inst.split("[")[1].split("]")[0];
      memory[memoryAddress] = applyMaskToValue(currentMask, val);
    }
  }

  var sum = 0;
  for (let i in memory) {
    if (memory.hasOwnProperty(i)) {
      sum += parseInt(memory[i]);
    }
  }

  return sum;
};

console.log("Part1: ", part1(input));

// PART 2
/**
 * Apply mask to memory
 * 0 -> do nothing
 * 1 -> set 1
 * X -> WildCard  : do both
 */

function applyMaskToMemory(mask, memory) {
  let modBinStr = (memory >>> 0).toString(2);
  modBinStr = modBinStr.padStart(36, "0").split("");

  for (let m of mask) {
    const { i, b } = m;
    if (b == "0") {
      continue;
    }
    modBinStr[i] = b.toString();
  }

  let memoryLocs = [];
  const wildBits = mask.filter((a) => a.b == "X");

  for (let i = 0; i < Math.pow(2, wildBits.length); i++) {
    let ittrMem = [...modBinStr];

    const binI = (i >>> 0).toString(2).padStart(wildBits.length, "0").split("");

    for (let j = 0; j < binI.length; j++) {
      const { i: idx } = wildBits[j];
      ittrMem[idx] = binI[j].toString();
    }

    memoryLocs.push(parseInt(ittrMem.join(""), 2));
  }

  return memoryLocs;
}

const part2 = ([...input]) => {
  const memory = {};
  let currentMask = [{}];
  for (let line of input) {
    const [inst, val] = line.split(" = ");
    if (inst.toLowerCase() == "mask") {
      currentMask = parseMask(val);
    } else {
      const memoryAddress = inst.split("[")[1].split("]")[0];

      const memoryLocsToMod = applyMaskToMemory(currentMask, memoryAddress);
      for (let m of memoryLocsToMod) {
        memory[m] = parseInt(val);
      }
    }
  }

  var sum = 0;
  for (let i in memory) {
    if (memory.hasOwnProperty(i)) {
      sum += parseInt(memory[i]);
    }
  }

  return sum;
};

console.log("Part2 : ", part2(input));
