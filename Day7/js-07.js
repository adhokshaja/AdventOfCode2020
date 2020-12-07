/*
have a shiny gold bag
how many colors can, eventually, contain at least one shiny gold bag?
*/
const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString()
  .split("\n");

//console.log(input);

/**
 * Creates a dictionary of rules from input 
 * 
 * Example Output : 
 * 
 *    {
 *      "shiny gold": {
 *        "dark olive": 1 , 
 *        "vibrant plum": 2
 *      },
 *      "faded blue":{
 *      }
 * }

 * @param {[String]} input Array of plain text rules to be parsed
 */
function createBagRulesForInput(input) {
  const mainBagRegex = /^(?<bagColor>\w+\s\w+) bags contain (?<contents>[^\n]*).$/;
  const containedBagRegex = /(?<quantity>\d+) (?<color>\w+\s\w+) bag(s)?/;

  return input
    .map((rule) => {

      const {
        groups: { bagColor, contents },
      } = mainBagRegex.exec(rule.trim());

      // Parse Contents
      const containedBags = contents
        .split(",")
        .map((a) => {
          var matches = containedBagRegex.exec(a.trim());

          if (!matches) return null; // contains no bags

          const {
            groups: { quantity, color },
          } = matches;

          var content = {};
          content[color] = quantity - 0;
          return content;
        })
        .reduce((a, b) => {
          return { ...a, ...b };
        }, {});

      // Return {bagColor: containedBags}
      const thisBag = {};
      thisBag[bagColor] = containedBags;
      return thisBag;
    })
    .reduce((a, b) => {
      return { ...a, ...b };
    }, {});
}

const rules = createBagRulesForInput(input);

const part1 = (rules) => {
  // Create a lookup table for all bags not visited (only bag color stored)
  // remove empty bags & the shiny gold bag
  var bagColorsNotVisited = Object.keys(rules)
    .filter((k) => k !== "shiny gold")
    .filter((k) => Object.entries(rules[k]).length !== 0);

  /**
   * From the lookup table find & return bags that can contain Current bagColor
   * Also remove those bags from the lookup table
   * @param {string} bagColorToSearch current bag color
   */
  function findAndRemoveBagsContainingCurrBag(bagColorToSearch) {
    // for each bagColorNotVisited in bagColorsNotVisited,
    // see if rules[bagColorNotVisited] has an entry for bagColorToSearch
    var bagsWithCurrBagColor = bagColorsNotVisited.filter(
      (bagColorNotVisited) => !!rules[bagColorNotVisited][bagColorToSearch]
    );

    // remove bags found from lookup
    // Necessary to avoid double counting bags already visited
    bagsWithCurrBagColor.forEach((a) => {
      bagColorsNotVisited.splice(bagColorsNotVisited.indexOf(a), 1);
    });

    return bagsWithCurrBagColor;
  }

  // Stack of bags that need to be visited
  var searchStack = ["shiny gold"];
  var totalBagsFound = 0;

  while (searchStack.length > 0) {
    // Get one bag from Stack
    var bagToSearch = searchStack.pop();

    var bagsFound = findAndRemoveBagsContainingCurrBag(bagToSearch);

    //updateTotalBags
    totalBagsFound += bagsFound.length;

    // Add found bags to stack
    searchStack.push(...bagsFound);
  }

  return totalBagsFound;
};

console.log("Part 1", part1(rules));

const part2 = (rules) => {
  var totalbags = 0;

  // [["<color>",<quantity>]]
  var bagsToSearch = Object.entries(rules["shiny gold"]);
  while (bagsToSearch.length > 0) {
    var [color, quantity] = bagsToSearch.pop();
    totalbags += quantity;
    var currBagContents = Object.entries(rules[color]).map((a) => [
      a[0],
      a[1] * quantity,
    ]);
    bagsToSearch.push(...currBagContents);
  }

  return totalbags;
};

console.log("Part 2", part2(rules));


// TEST CASES

/*
var testInput = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`
  .toString()
  .split("\n");
*/
//const testRules = createBagRulesForInput(testInput);
//console.log("Total Rules", Object.keys(rules).length);
//console.log(part1(testRules));
//console.log(part2(testRules));