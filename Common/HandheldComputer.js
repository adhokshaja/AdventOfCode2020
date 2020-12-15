class HandheldComputer {
  /**
   *
   * @typedef {{programPath:[Number],visitedLocs:Set<Number>, wasCleanExit:Boolean?, wasRun:boolean, acc:Number, ptr:number}} MachineState
   */

  /**
   * Initialize a handheld computer
   * @param {[[op:string,arg:Number]]} code Code for the handheldcomputer
   * @param {(state:MachineState)=>Boolean} globalExitCondition - Global Exit Condition is an "OR" condition
   * @param {{acc:Number, ptr:Number}} InitialState
   */
  constructor(
    code = [[]],
    globalExitCondition = (state) => true,
    { acc = 0, ptr = 0 }
  ) {
    this.instructions = [...code];
    this.globalExitCondition = globalExitCondition;
    /**
     * {MachineState}
     */
    this.state = {
      programPath: [],
      visitedLocs: new Set(),
      wasCleanExit: null,
      wasRun: false,
      acc,
      ptr,
    };
    this.InitialState = {
      acc,
      ptr,
    };
    this.visitedLocs = new Set();
  }

  /**
   * Run code in the machine
   * @param {(state:MachineState)=>Boolean} specificExitCondition
   */
  run(specificExitCondition = (state) => true, resetToInitalState = false) {
    if (resetToInitalState) {
      this.resetState(false);
    }
    this.state.wasRun = true;
    this.state.wasCleanExit = false;
    const fullExitCondition =
      this.state.ptr >= this.instructions.length ||
      this.globalExitCondition ||
      specificExitCondition();

    // main program Loop

    while (!fullExitCondition) {
      {
        this.state.visitedLocs.add(ptr);
        this.state.programPath.push(ptr);

        const [op, arg] = this.instructions[ptr];

        switch (op) {
          case "acc":
            this.state.acc += arg - 0;
            this.state.ptr += 1;

            break;
          case "jmp":
            this.state.acc = this.state.acc;
            this.state.ptr += arg - 0;
            break;
          case "nop":
            this.state.acc = this.state.acc;
            this.state.ptr += 1;
            break;
        }
      }
    }

    return this.state;
  }

  /**
   * Ater Instruction at given location
   * @param {Number} loc  Index for change
   * @param {[op:string,arg:number]} new_inst New Instruction
   */
  alterInstAtLoc(loc, new_inst) {
    this.instructions[loc] = [new_inst[0], new_inst[1]];
  }

  /**
   * Replace all instructions
   * @param {[[op:string,arg:number]]} new_inst New Instruction
   */
  alterInsts(new_insts) {
    this.instructions = [...new_insts];
  }

  resetState(hardReset){
    if(hardReset){
        this.state = {
          programPath: [],
          visitedLocs: new Set(),
          wasCleanExit: null,
          wasRun: false,
          ...this.InitialState,
        };
    }else{
        this.state = { ...this.state, ...this.InitialState };
    }
  }

  alterInstAtLocAndRun(loc, new_inst, specificExitCondition){
      this.alterInstAtLoc(loc,new_inst);
      return this.run(specificExitCondition,true);
  }
}
