/*
 26 yes-or-no questions marked a through z
 All you need to do is identify the questions for which ANYONE in your group answers "yes".

Each group's answers are separated by a blank line, and within each group, each person's answers are on a single line.
What is the sum of counts of correct answers per group?
*/
const AllAnswers = new Set('abcdefghijklmnopqrstuvwxyz'.split(''));

const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString()
  .split("\n\n");

//console.log(input);

var groupAnswers = input.map(group =>{
  const indAns = group.split('\n');
  const uniqueAnswers = new Set();
  indAns.forEach(ans =>{
    ans.split("").forEach((a) => uniqueAnswers.add(a));
  });

  const allAnsweredYes = indAns.reduce((a, ans) => {
    return new Set(ans.split("").filter((i) => a.has(i))); // intersection of two sets
  }, AllAnswers);

  return {
    indAns,
    uniqueAnswers,
    allAnsweredYes,
  };
});

var p1 = groupAnswers.map(x=>x.uniqueAnswers.size).reduce((a,b)=>a+b,0);

console.log(p1);

var p2 = groupAnswers.map((x) => x.allAnsweredYes.size).reduce((a, b) => a + b, 0);

console.log(p2);
