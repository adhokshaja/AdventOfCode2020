/*
Encoding Error

eXchange-Masking Addition System (XMAS)

preamble of 25 numbers
After that, each number you receive should be the sum of any two of the 25 immediately previous numbers
The two numbers will have different values, and there might be more than one such pair.
What is the first number that does not have this property?
*/



const doesHaveSum = (arr, sum) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] + arr[j] == sum) {
        return true;
      }
    }
  }
  return false;
};

const part1 = ([...numbers], preambleLength = 25) => {
  var len = numbers.length;
  for (let i = preambleLength; i < len; i++) {
    var subset = numbers.slice(i - preambleLength, i);
    var reqdSum = numbers[i];
    if (!doesHaveSum(subset, reqdSum)) {
      return { reqdSum, i, subset };
    }
  }
  return null;
};

console.log("Part1", part1(input, 25).reqdSum);

const part2 = ([...numbers], preambleLength = 25) => {
  const { reqdSum } = part1([...numbers], preambleLength);

  for (let i = 0; i < numbers.length - 2; i++) {
    for (let j = i + 2; j < numbers.length; j++) {
      const subset = [...numbers].slice(i, j);
      if (subset.reduce((a, b) => a + b, 0) == reqdSum) {
        return {
          subset,
          allAdded: subset.reduce((a, b) => a + b, 0),
          reqdSum,
          min: Math.min(...subset),
          max: Math.max(...subset),
          sum: Math.min(...subset) + Math.max(...subset),
        };
      }
    }
  }
  return null;
};

console.log("Part2", { ...part2(input, 25) }.sum);
