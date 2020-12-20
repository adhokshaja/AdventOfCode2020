const fs = require("fs");

let [rulesUnOrdered, messages] = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString()
  .split("\r\n\r\n")
  .map((a) => a.split("\r\n"));

rules = [];

for (let r of rulesUnOrdered) {
  let parts = r.split(":").map((x) => x.trim());
  rules[parts[0]] = parts[1];
}

// k ='4 1 5 45';
// l = k.replace(/([^0-9]|^)45([^0-9]|$)/, "$1k$2");
// l
// k

const Part1 = (rules, messages) => {
  let rule0 = rules[0];

  hasNumbers = new RegExp("[0-9]+");
  // console.log(rule0.match(hasNumbers));
  let match = rule0.match(hasNumbers);
  while (match) {
    const [num] = match;
    const ruleAtNum = (rules[num] + "").replace(/"/g, "");
    let replaceRegex = new RegExp(`([^0-9]|^)${num}([^0-9]|$)`, "g");
    let replacement =
      ruleAtNum.indexOf("|") > 0 ? `$1(${ruleAtNum})$2` : `$1${ruleAtNum}$2`;
    rule0 = rule0.replace(replaceRegex, replacement);
    match = rule0.match(hasNumbers);
    //console.log(++i);
  }
  rule0 = "^" + rule0.replace(/\s/g, "") + "$";
  // console.log(rule0);
  const rule0Regex = new RegExp(rule0);
  let filteredMessages = messages.filter((a) => a.match(rule0Regex));

  //console.log(filteredMessages);

  return filteredMessages.length;
};

var p1 = Part1(rules, messages);

console.log(p1);

const Part2 = (rules, messages) => {
  let rule0 = rules[0];

  hasNumbers = new RegExp("[0-9]+");
  // console.log(rule0.match(hasNumbers));
  let match = rule0.match(hasNumbers);

  let prevFilteredMessageLength = 0;
  let currentFiltredMessageLength = -1;
  let currLimitR11 = 2; // start with atleast 2 reps

  do {
    // HACK: ? for rule 11, recursively add 11 for a set number of turns. Increment this limit untill length of filtered messages no longer changes
    let limitR11 = ++currLimitR11;
    while (match) {
      const [num] = match;
      const ruleAtNum = (rules[num] + "").replace(/"/g, "");
      let replaceRegex = new RegExp(`([^0-9]|^)${num}([^0-9]|$)`, "g");
      let replacement =
        ruleAtNum.indexOf("|") > 0 ? `$1(${ruleAtNum})$2` : `$1${ruleAtNum}$2`;
      // handle 8 and 11 differently

      if (num == 8) {
        //8: 42 | 42 8  -> rule 42+
        const rule_42 = (rules[42] + "").replace(/"/g, "");
        replacement = `$1(${rule_42})+$2`;
      } else if (num == 11) {
        // 11: 42 31 | 42 11 31 -> 42 42 42 ... 31 31 31 -> Equal number of 42 & 31
        const rule_42 = (rules[42] + "").replace(/"/g, "");
        const rule_31 = (rules[31] + "").replace(/"/g, "");
        if (--limitR11 >= 0) {
          replacement = `$1((${rule_42}) (11)? (${rule_31}))$2`;
        } else {
          replacement = `$1((${rule_42}) (${rule_31}))$2`;
        }
      }
      rule0 = rule0.replace(replaceRegex, replacement);
      match = rule0.match(hasNumbers);
      //console.log(++i);
    }

    rule0 = rule0.replace(/\?GH/g, "\1");
    rule0 = "^" + rule0.replace(/\s/g, "") + "$";
    // console.log(rule0);
    const rule0Regex = new RegExp(rule0);
    let filteredMessages = messages.filter((a) => a.match(rule0Regex));

    // console.log(filteredMessages);
    prevFilteredMessageLength = currentFiltredMessageLength;
    currentFiltredMessageLength = filteredMessages.length;
  } while (prevFilteredMessageLength != currentFiltredMessageLength);

  return { currentFiltredMessageLength, currLimitR11 };
};

var p2 = Part2(rules, messages);

console.log(p2);
