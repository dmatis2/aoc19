import { count } from "console";
import { getFileContent, getDataAsArray } from "./utils.js";

const parseInput = (arr) => {
  const regex = /(?<direction>\w)(?<count>\d+)/;
  return arr.map((line) => {
    return line.split(",").map((point) => {
      const { direction, count } = point.match(regex).groups;
      return {
        direction,
        count: parseInt(count),
      };
    });
  });
};

const process = (arr, isPart1) => {
  const map = new Map();
  let [x, y] = [0, 0];
  let step = 0;
  arr[0].forEach((point) => {
    if (point.direction === "U") {
      for (let i = 0; i < point.count; i++) {
        y--;
        step++;
        const str = JSON.stringify([y, x]);
        if (!map.has(str)) map.set(str, step);
        else map.set(str, step);
      }
    }
    if (point.direction === "R") {
      for (let i = 0; i < point.count; i++) {
        x++;
        step++;
        const str = JSON.stringify([y, x]);
        if (!map.has(str)) map.set(str, step);
        else map.set(str, step);
      }
    }
    if (point.direction === "D") {
      for (let i = 0; i < point.count; i++) {
        y++;
        step++;
        const str = JSON.stringify([y, x]);
        if (!map.has(str)) map.set(str, step);
        else map.set(str, step);
      }
    }
    if (point.direction === "L") {
      for (let i = 0; i < point.count; i++) {
        x--;
        step++;
        const str = JSON.stringify([y, x]);
        if (!map.has(str)) map.set(str, step);
        else map.set(str, step);
      }
    }
  });

  let leastSteps = Number.POSITIVE_INFINITY;
  let closest = Number.POSITIVE_INFINITY;
  y = 0;
  x = 0;
  step = -1;

  arr[1].forEach((point) => {
    if (point.direction === "U") {
      for (let i = 0; i < point.count; i++) {
        y--;
        step++;
        const str = JSON.stringify([y, x]);
        if (map.has(str)) {
          const manhattan = Math.abs(y) + Math.abs(x);
          if (manhattan < closest) {
            closest = manhattan;
          }
          const calculatedSteps = step + map.get(str);
          if (calculatedSteps < leastSteps) leastSteps = calculatedSteps;
        }
      }
    }
    if (point.direction === "R") {
      for (let i = 0; i < point.count; i++) {
        x++;
        step++;
        const str = JSON.stringify([y, x]);
        if (map.has(str)) {
          const manhattan = Math.abs(y) + Math.abs(x);
          if (manhattan < closest) {
            closest = manhattan;
          }
          const calculatedSteps = step + map.get(str);
          if (calculatedSteps < leastSteps) leastSteps = calculatedSteps;
        }
      }
    }
    if (point.direction === "D") {
      for (let i = 0; i < point.count; i++) {
        y++;
        step++;
        const str = JSON.stringify([y, x]);
        if (map.has(str)) {
          const manhattan = Math.abs(y) + Math.abs(x);
          if (manhattan < closest) {
            closest = manhattan;
          }
          const calculatedSteps = step + map.get(str);
          if (calculatedSteps < leastSteps) leastSteps = calculatedSteps;
        }
      }
    }
    if (point.direction === "L") {
      for (let i = 0; i < point.count; i++) {
        x--;
        step++;
        const str = JSON.stringify([y, x]);
        if (map.has(str)) {
          const manhattan = Math.abs(y) + Math.abs(x);
          if (manhattan < closest) {
            closest = manhattan;
          }
          const calculatedSteps = step + map.get(str);
          if (calculatedSteps < leastSteps) leastSteps = calculatedSteps;
        }
      }
    }
  });
  return isPart1 ? closest : leastSteps + 1;
};

const first = (arr) => {
  const result = process(arr, true);
  console.log(result);
  return result;
};

const second = (arr) => {
  const result = process(arr, false);
  console.log(result);
  return result;
};

const data = parseInput(getDataAsArray(getFileContent("input.txt")));
console.assert(first(data) === 1225, "Not matching first part");
console.assert(second(data) === 107036, "Not matching second part");
