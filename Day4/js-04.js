/*
All fields should be present
byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID) -- can be skipped
*/

const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", (_, a) => a)
  .toString()
  .split("\n\n")
  .filter((line) => !!line)
  .map((line) => {

    return line.split(/\s+/)
      .map((section) => {
        const k = section.split(":");
        var retVal = {};
        retVal[k[0]] = k[1];
        return retVal;
      })
      .reduce((a, section) => {
        return { ...a, ...section };
      }, {});
  });

var p1 = input.filter((pass) => {
  if (!pass["byr"]) return false;
  if (!pass["eyr"]) return false;
  if (!pass["iyr"]) return false;
  if (!pass["hgt"]) return false;
  if (!pass["hcl"]) return false;
  if (!pass["ecl"]) return false;
  if (!pass["pid"]) return false;
  return true;
});

console.log(p1.length);

function is4DigitNumberBetween(input, min, max) {
  return input.match(/^\d{4}$/) && input - 0 >= min && input - 0 <= max;
}

function isValidHeight(h) {
  const hgtMatch = h.match(/^(\d{2,3})(in|cm)$/);
  if (!hgtMatch) return false;
  var hgtNum = parseInt(hgtMatch[1]);
  if (hgtMatch[2] == "cm") {
    if (hgtNum >= 150 && hgtNum <= 193) return true;
  }
  if (hgtMatch[2] == "in") {
    if (hgtNum >= 59 && hgtNum <= 76) return true;
  }
  return false;
}

function isValidColor(c) {
  return !!c.toLowerCase().match(/^#[0-9a-f]{6}$/);
}

function isValidEyeColor(e) {
  return !!e.toLowerCase().match(/^(amb|blu|brn|gry|grn|hzl|oth)$/);
}

function isValidPassId(p) {
  return !!p.match(/^[0-9]{9}$/);
}

var p2 = p1.filter(
  ({ byr, iyr, eyr, hgt, hcl, ecl, pid }) =>
    is4DigitNumberBetween(byr, 1920, 2002) &&
    is4DigitNumberBetween(iyr, 2010, 2020) &&
    is4DigitNumberBetween(eyr, 2020, 2030) &&
    isValidHeight(hgt) &&
    isValidColor(hcl) &&
    isValidEyeColor(ecl) &&
    isValidPassId(pid)
);

//console.log(p2);

console.log(p2.length);
console.log(input.length);