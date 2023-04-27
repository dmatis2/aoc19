import { getFileContent, getDataAsArray } from './utils.js';

const first = (arr) => {
  const asteroids = [];
  arr.forEach((line, row) => {
    line.split('').forEach((ch, col) => {
      if (ch === '#') {
        asteroids.push(JSON.stringify([row, col]));
      }
    });
  });
  let maxCount = 0;
  asteroids.forEach((pos) => {
    const [row, col] = JSON.parse(pos);
    const others = asteroids
      .filter((p) => p !== pos)
      .map((p) => JSON.parse(p))
      .sort((a, b) => a[1] - b[1]);
    const lowerSlopes = new Set();
    const higherSlopes = new Set();
    others.forEach(([row2, col2]) => {
      if (col2 <= col) {
        const slope = (row - row2) / (col - col2);
        // const slope = (row2 - row) / (col2 - col);
        if (!lowerSlopes.has(slope)) {
          lowerSlopes.add(slope);
        }
      }
      const slope = (row2 - row) / (col2 - col);
      if (!higherSlopes.has(slope)) {
        higherSlopes.add(slope);
      }
    });
    const allSlopes = new Set([...lowerSlopes, ...higherSlopes]);
    console.log([row, col], lowerSlopes.size, higherSlopes.size, allSlopes.size);
    if (allSlopes.size > maxCount) maxCount = allSlopes.size;
  });
  console.log(maxCount);
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
console.assert(first(data) === 8, 'Not matching first part');
// console.assert(second(data) === 0, 'Not matching second part');
