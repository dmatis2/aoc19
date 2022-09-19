import { getFileContent, getDataAsArrayOfNumbers } from "./utils.js";

const process = (arr, isPart1 = true) => {
  let counter = 0;
  for (let i = arr[0]; i <= arr[1]; i++) {
    if (!i.toString().match(/(\d)\1/)) continue;
    if (i.toString() !== i.toString().split("").sort().join("")) continue;

    if (!isPart1) {
      const map = new Map();
      for (let j = 0; j < 10; j++)
        map.set(
          j,
          i
            .toString()
            .split("")
            .filter((k) => parseInt(k) === j).length
        );
      if (!Array.from(map.values()).includes(2)) continue;
    }
    counter++;
  }
  return counter;
};

const first = (arr) => {
  const result = process(arr);
  console.log(result);
  return result;
};

const second = (arr) => {
  const result = process(arr, false);
  console.log(result);
  return result;
};

const data = getDataAsArrayOfNumbers(getFileContent("input.txt"), "-");
console.assert(first(data) === 481, "Not matching first part");
console.assert(second(data) === 299, "Not matching second part");
