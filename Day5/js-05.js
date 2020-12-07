/*
binary space partitioning
F means "front", B means "back", L means "left", and R means "right".
first 7 will be F or B

Rows numbered 0-127

Start with the whole list of rows; 
 The first letter indicates whether the seat is in the front (0 through 63) or the back (64 through 127).
 The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.

3 bits represent 8 columns of seats 0-7

Seat ID = Row*8+Column


What is the highest seat ID on a boarding pass?
*/

const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString()
  .split("\n");

  //console.log(input);

function parseSeat(seat){
  const row = parseInt(
    seat
      .substr(0, 7)
      .split("")
      .map((x) => (x == "F" ? 0 : 1))
      .join(""),
    2 // Radix 2 binary
  );

  const col = parseInt(
    seat
      .substr(7, 3)
      .split("")
      .map((x) => (x == "L" ? 0 : 1))
      .join(""),
    2 // Radix 2 binary
  );

  return { seat, row, col, seatId: row * 8 + col };
}

  var seats = input.map(parseSeat);


  var p1 = seats.reduce((a,x)=>
    x.seatId > a? x.seatId : a
  ,0)

  console.log("Part 1", p1);

var sortedSeatIds = seats.map(x=>x.seatId).sort((a,b)=>a-b);

let currSeatId = sortedSeatIds[0];
for(let seatId of sortedSeatIds){
  if(parseInt(seatId) - parseInt(currSeatId) >1){
    console.log("Part 2",seatId-1);
    break;
  }
  currSeatId = seatId;
}