import { getFileContent, getDataAsArrayOfNumbers } from './utils.js';

const process = (_arr, _input) => {
  let tmpInput = _input;
  let arr = JSON.parse(JSON.stringify(_arr));
  let curIndex = 0;
  while (arr[curIndex] !== 99) {
    const tmp = parseInt(arr[curIndex].toString().padStart(5, '0').split('').slice(4, 6).join(''));
    let a = 0,
      b = 0,
      c = 0;
    if (tmp === 3 || tmp === 4) {
      a = arr[curIndex + 1];
      b = arr[curIndex + 2];
    } else {
      a = arr[curIndex + 1];
      b = arr[curIndex + 2];
      c = arr[curIndex + 3];
    }
    const _op = arr[curIndex].toString().padStart(5, '0');
    const regex = /(?<third>\d)(?<second>\d)(?<first>\d)(?<op>\d{2})/;
    const { op, first, second } = _op.match(regex).groups;
    console.log(curIndex, op);
    if (parseInt(op) === 1) {
      const val1 = parseInt(first) === 0 ? arr[a] : a;
      const val2 = parseInt(second) === 0 ? arr[b] : b;
      arr[c] = val1 + val2;
      curIndex += 4;
    } else if (parseInt(op) === 2) {
      const val1 = parseInt(first) === 0 ? arr[a] : a;
      const val2 = parseInt(second) === 0 ? arr[b] : b;
      arr[c] = val1 * val2;
      curIndex += 4;
    } else if (parseInt(op) === 3) {
      // takes a single integer as input and saves it to the position given by its only parameter
      arr[a] = tmpInput.shift();
      curIndex += 2;
    } else if (parseInt(op) === 4) {
      // outputs the value of its only parameter
      const value = parseInt(first) === 0 ? arr[a] : a;
      if (value !== 0) {
        console.log('Done on index', curIndex);
        return value;
      }
      curIndex += 2;
    } else if (parseInt(op) === 5) {
      const val1 = parseInt(first) === 0 ? arr[a] : a;
      console.log(op, curIndex, first, val1);
      if (val1 !== 0) {
        curIndex = parseInt(second) === 0 ? arr[b] : b;
      } else {
        curIndex += 3;
      }
    } else if (parseInt(op) === 6) {
      const val1 = parseInt(first) === 0 ? arr[a] : a;
      if (val1 === 0) {
        curIndex = parseInt(second) === 0 ? arr[b] : b;
      } else {
        curIndex += 3;
      }
    } else if (parseInt(op) === 7) {
      const val1 = parseInt(first) === 0 ? arr[a] : a;
      const val2 = parseInt(second) === 0 ? arr[b] : b;
      arr[c] = val1 < val2 ? 1 : 0;
      curIndex += 4;
    } else if (parseInt(op) === 8) {
      const val1 = parseInt(first) === 0 ? arr[a] : a;
      const val2 = parseInt(second) === 0 ? arr[b] : b;
      arr[c] = val1 === val2 ? 1 : 0;
      curIndex += 4;
    } else {
      return arr[0];
    }
  }
  return arr[0];
};

const multiProcessPart1 = (_arr, input) => {
  let max = 0;
  for (let a = 0; a < 5; a++) {
    for (let b = 0; b < 5; b++) {
      for (let c = 0; c < 5; c++) {
        for (let d = 0; d < 5; d++) {
          for (let e = 0; e < 5; e++) {
            if (new Set([a, b, c, d, e]).size !== 5) continue;
            const val1 = process(_arr, [a, input]);
            const val2 = process(_arr, [b, val1]);
            const val3 = process(_arr, [c, val2]);
            const val4 = process(_arr, [d, val3]);
            const val5 = process(_arr, [e, val4]);
            if (val5 > max) {
              max = val5;
            }
          }
        }
      }
    }
  }
  return max;
};

const processPart2 = (_arr, _input) => {
  let tmpInput = _input;
  let arr = JSON.parse(JSON.stringify(_arr));
  let curIndex = 0;
  while (arr[curIndex] !== 99) {
    const tmp = parseInt(arr[curIndex].toString().padStart(5, '0').split('').slice(4, 6).join(''));
    let a = 0,
      b = 0,
      c = 0;
    if (tmp === 3 || tmp === 4) {
      a = arr[curIndex + 1];
    } else {
      a = arr[curIndex + 1];
      b = arr[curIndex + 2];
      c = arr[curIndex + 3];
    }
    const _op = arr[curIndex].toString().padStart(5, '0');
    const regex = /(?<third>\d)(?<second>\d)(?<first>\d)(?<op>\d{2})/;
    const { op, first, second, third } = _op.match(regex).groups;
    if (parseInt(op) === 1) {
      const val1 = parseInt(first) === 0 ? arr[a] : a;
      const val2 = parseInt(second) === 0 ? arr[b] : b;
      arr[c] = val1 + val2;
      curIndex += 4;
    } else if (parseInt(op) === 2) {
      const val1 = parseInt(first) === 0 ? arr[a] : a;
      const val2 = parseInt(second) === 0 ? arr[b] : b;
      arr[c] = val1 * val2;
      curIndex += 4;
    } else if (parseInt(op) === 3) {
      // takes a single integer as input and saves it to the position given by its only parameter
      arr[a] = tmpInput.shift();
      curIndex += 2;
    } else if (parseInt(op) === 4) {
      // outputs the value of its only parameter
      const value = parseInt(first) === 0 ? arr[a] : a;
      if (value !== 0) {
        console.log(value);
      }
      curIndex += 2;
    } else if (parseInt(op) === 5) {
      const val1 = parseInt(first) === 0 ? arr[a] : a;
      if (val1 !== 0) {
        curIndex = parseInt(second) === 0 ? arr[b] : b;
      } else {
        curIndex += 3;
      }
    } else if (parseInt(op) === 6) {
      const val1 = parseInt(first) === 0 ? arr[a] : a;
      if (val1 === 0) {
        curIndex = parseInt(second) === 0 ? arr[b] : b;
      } else {
        curIndex += 3;
      }
    } else if (parseInt(op) === 7) {
      const val1 = parseInt(first) === 0 ? arr[a] : a;
      const val2 = parseInt(second) === 0 ? arr[b] : b;
      arr[c] = val1 < val2 ? 1 : 0;
      curIndex += 4;
    } else if (parseInt(op) === 8) {
      const val1 = parseInt(first) === 0 ? arr[a] : a;
      const val2 = parseInt(second) === 0 ? arr[b] : b;
      arr[c] = val1 === val2 ? 1 : 0;
      curIndex += 4;
    } else {
      return arr[0];
    }
  }
  return arr[0];
};

const multiProcessPart2 = (_arr, input) => {
  let max = 0;
  for (let a = 5; a < 10; a++) {
    for (let b = 5; b < 10; b++) {
      for (let c = 5; c < 10; c++) {
        for (let d = 5; d < 10; d++) {
          for (let e = 5; e < 10; e++) {
            if (new Set([a, b, c, d, e]).size !== 5) continue;
            const val1 = processPart2(_arr, [a, input]);
            return 0;
            // const val2 = process(_arr, [b, val1]);
            // const val3 = process(_arr, [c, val2]);
            // const val4 = process(_arr, [d, val3]);
            // const val5 = process(_arr, [e, val4]);
            // if (val5 > max) {
            //   max = val5;
            // }
          }
        }
      }
    }
  }
  return max;
};

const first = (arr) => {
  // const result = process([arr[0], 12, 2, ...arr.slice(3)], [1]);
  const result = multiProcessPart1(arr, 0);
  console.log(result);
  return result;
};

const second = (arr) => {
  const result = multiProcessPart2(arr, 0);
  console.log(result);
  return result;
};

const data = getDataAsArrayOfNumbers(getFileContent('input.txt'), ',');
console.assert(first(data) === 16209841, 'Not matching first part');
// console.assert(second(data) === 0, "Not matching second part");
