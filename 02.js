import { getFileContent, getDataAsArrayOfNumbers } from "./utils.js";

const process = (_arr) => {
  let arr = JSON.parse(JSON.stringify(_arr));
  let curIndex = 0;
  while (arr[curIndex] !== 99) {
    const [op, a, b, c] = arr.slice(curIndex, curIndex + 4);
    if (op === 1) {
      arr[c] = arr[a] + arr[b];
    } else {
      arr[c] = arr[a] * arr[b];
    }
    curIndex += 4;
  }
  return arr[0];
};

const first = (arr) => {
  const result = process([arr[0], 12, 2, ...arr.slice(3)]);
  console.log(result);
  return result;
};

const second = (_arr) => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const arr = JSON.parse(JSON.stringify(_arr));
      const _result = process([arr[0], noun, verb, ...arr.slice(3)]);
      if (_result === 19690720) {
        const result = 100 * noun + verb;
        console.log(result);
        return result;
      }
    }
  }
  const result = -1;
  console.log(result);
  return result;
};

const data = getDataAsArrayOfNumbers(getFileContent("input.txt"), ",");
console.assert(first(data) === 0, "Not matching first part");
console.assert(second(data) === 0, "Not matching second part");
