/*

The boot code is represented as a text file with one instruction per line of text. 
Each instruction consists of an operation (acc, jmp, or nop) and an argument (a signed number like +4 or -20).

  acc increases or decreases a single global value called the accumulator by the value given in the argument.
  jmp jumps to a new instruction relative to itself. 
  nop stands for No OPeration - it does nothing. The instruction immediately below it is executed next.
*/
const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString()
  .split("\n");


//console.log(input);

var code = input.map(instruction => instruction.split(" "));


function handHeldMachnie(code) {

  let accumulator = 0;
  let ptr = 0;

  let visitedPtrs = new Set();
  
  //exit when you encounter a node already visited or you reach the end of the code file
  const exitCondition = () => visitedPtrs.has(ptr) || ptr >= code.length;

  while (!exitCondition()) {
    visitedPtrs.add(ptr);
    const [op, arg] = code[ptr];
    switch (op) {

      case "acc":
        
        accumulator += arg - 0;
        ptr += 1;

        break;
      case "jmp":
        accumulator = accumulator;
        ptr += arg - 0;
        break;
      case "nop":
        accumulator = accumulator;
        ptr += 1;
        break;
    }
  }


  return {
    accumulator,
    cleanExit: ptr >= code.length,
    pointer: ptr
  };

}


const part1 = handHeldMachnie;

console.log("P1:", part1(code).accumulator);





const part2 = function(code){

  var evals = [];

  for(let i=0; i<code.length; i++){
    const codeCopy = code.map(([op,arg])=>[op,arg]);

    if (code[i][0] === "jmp") {
      codeCopy[i][0] = "nop";
    } else if (code[i][0] === "nop") {
      codeCopy[i][0] = "jmp";
    }else{
      continue;
    }
    evals.push({
      i: {
        index: i,
        origInst: code[i].join(" "),
        patchInst: codeCopy[i].join(" "),
      },
      e: handHeldMachnie(codeCopy),
    });
  }

  return evals.filter(a=>a.e.cleanExit)[0];
}

console.log("P2:",part2(code).e.accumulator);