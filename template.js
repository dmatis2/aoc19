import { getFileContent, getDataAsArray } from './utils.js';

const first = (arr) => {
  const result = 0;
  console.log(result);
  return result;
};

const second = (arr) => {
  const result = 0;
  console.log(result);
  return result;
};

const data = getDataAsArray(getFileContent('example.txt'));
console.assert(first(data) === 0, 'Not matching first part');
console.assert(second(data) === 0, 'Not matching second part');
