import { getFileContent, getDataAsArrayOfNumbers } from "./utils.js";

const getRequiredFuel = (mass) => {
  return Math.floor(mass / 3) - 2;
};

const getRequiredFuelPart2 = (mass) => {
  let result = Math.floor(mass / 3) - 2;
  let sum = 0;
  let oldResult = result;
  while (result > 0) {
    oldResult = result;
    sum += result;
    result = Math.floor(result / 3) - 2;
  }
  return sum;
};

const first = (arr) => {
  const result = arr.reduce((a, v) => a + getRequiredFuel(v), 0);
  console.log(result);
  return result;
};

const second = (arr) => {
  const result = arr.reduce((a, v) => a + getRequiredFuelPart2(v), 0);
  console.log(result);
  return result;
};

const data = getDataAsArrayOfNumbers(getFileContent("input.txt"));
console.assert(first(data) === 3401852, "Not matching first part");
console.assert(second(data) === 5099916, "Not matching second part");
