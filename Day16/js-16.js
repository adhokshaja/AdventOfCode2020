/*
  Ticket Translation
*/

const fs = require("fs");


const input = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString();


function parseRules(rulesStr){
  let rulesRegex = /^([A-Za-z\s]+): (\d+)-(\d+) or (\d+)-(\d+)\s?$/;
  let rules = rulesStr.split("\r\n").map(a =>{
    let matches =  a.match(rulesRegex);
    let rule = {};
    rule[matches[1]] = {min: matches[2], lowMid :matches[3], highMid:matches[4], max:matches[5]}
   return rule;
  }).reduce((a,b)=>{return {...a,...b}},{});

  return rules;
}

function parseinput(input){

  var rules = {};
  var ticket = [];
  var nearbyTickets = [[]];
 
  var x = input.split("your ticket:");
  rulesStr = x[0].trim();
  var y = x[1].split("nearby tickets:");
  ticket = y[0].trim().split(',').map(a=>parseInt(a));

  nearbyTickets = y[1].trim().split('\r\n').map(a=>a.split(',').map(x=> parseInt(x)));
  //console.log(ticket.length)
  rules = parseRules(rulesStr);
  return {
    ticket,
    nearbyTickets,
    rules
  }
}

const {rules,nearbyTickets,ticket} = parseinput(input);

/**
 * 
 * @param {Number} val Value to be checked
 * @param {{min:Number, lowMid:Number, highMid:Number, max:Number}} rule 
 */
const matchesRule = (val,{min,lowMid,highMid,max}) => {
  return (val>=min && val<=lowMid) || (val>=highMid && val<=max);
}


const matchesAtleastOneRule = (val) => {
  for (const ruleName of Object.keys(rules)) {
    if (matchesRule(val, rules[ruleName])) {
      return true;
    }
  }
  return false;
};

const matchesAllRules =(val) => {
  for (const ruleName of Object.keys(rules)) {
    if (!matchesRule(val, rules[ruleName])) {
      return false;
    }
  }
  return true;
}

const getRuleMatches = (val) => {
  return Object.keys(rules).map(ruleName =>{
      return [ruleName,val,matchesRule(val, rules[ruleName])];
  });
};


// PART 1

const Part1 = () => {
  var allticketNumbers = [].concat.apply([],nearbyTickets);
  const invalidTicketNumbers = allticketNumbers.filter(x => !matchesAtleastOneRule(x));
  invalidTicketNumbers
  return invalidTicketNumbers.reduce((a,b)=>a+b,0);
};

console.log("Part1 ", Part1(input));



// PART 2

const Part2 = () => {
  const validTickets = nearbyTickets.filter(ticket => {
    return ticket.filter(x=>matchesAtleastOneRule(x)).length == ticket.length;
  });
  let rulesMatchingField = validTickets[0].map( _ => new Set(Object.keys(rules)));
  for(let t of validTickets){
      for(let [idx,val] of t.entries()){
          const rulesNotMatchingVal = getRuleMatches(val).filter(([_1,_2,isValid]) => !isValid).map(([r,_1,_2])=>r);
          for(let r of rulesNotMatchingVal){
            
            rulesMatchingField[idx].delete(r);
          }
      }
  }

  const rulesMapping = [];

  let countedFields = 0;

  while (rulesMatchingField.length > countedFields) {
    //find the element & index with just 1 match
    var singleMatchedFieldIndex = rulesMatchingField.findIndex(
      (x) => x.size == 1
    );
    var singleMatchedField = [
      ...rulesMatchingField.slice(singleMatchedFieldIndex)[0].values(),
    ][0];

    //Add it to the mapping
    rulesMapping[singleMatchedFieldIndex] = singleMatchedField;

    //remove matchedFiled from all other sets
    for (r of rulesMatchingField) {
      r.delete(singleMatchedField);
    }
    countedFields++;
  }




  var departureNumbersFromTicket = [];
  for (let [i,rule] of rulesMapping.entries()){
    
    if (!rule){
      continue;
    }
    if (!rule.toLowerCase().startsWith("depart")) {
      continue;
    }
    let ticketNumber = ticket[i];
    departureNumbersFromTicket.push(ticketNumber);
  }

  


return departureNumbersFromTicket.reduce((a,b)=>a*b,1);

};
console.log("Part2 : ", Part2());
