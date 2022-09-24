import { getFileContent, getDataAsArray } from "./utils.js";

const getMap = (arr) => {
  const map = new Map();
  arr.forEach(line => {
    const [ from, to ] = line.split(')');
    map.set(to, from);
  })
  return map;
}

const process = (map) => {
  return Array.from(map.keys()).reduce((a, key) => {
    let value = 0;
    let current = key;
    while(current !== 'COM') {
      current = map.get(current);
      value++;
    }
    return a + value;
  }, 0)
}

const getFromYouToSanta = (map) => {
  let youPath = [];
  let santaPath = [];
  let current = 'YOU'
  while(current !== 'COM') {
    current = map.get(current);
    youPath.push(current);
  }
  current = 'SAN';
  while(current !== 'COM') {
    current = map.get(current);
    santaPath.push(current);
  }
  youPath = youPath.reverse();
  santaPath = santaPath.reverse();
  while(youPath[0] === santaPath[0]) {
    youPath.shift();
    santaPath.shift();
  }
  return youPath.length + santaPath.length;
}

const first = (arr) => {
  const map = getMap(arr);
  const result = process(map);
  console.log(result);
  return result;
};

const second = (arr) => {
  const map = getMap(arr);
  const result = getFromYouToSanta(map);
  console.log(result);
  return result;
};

const data = getDataAsArray(getFileContent("input.txt"));
console.assert(first(data) === 158090, "Not matching first part");
console.assert(second(data) === 241, "Not matching second part");
