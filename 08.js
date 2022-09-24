import { getFileContent, getDataAsArray } from "./utils.js";

const first = (arr) => {
  const layers = arr.length / 150;
  let numberOfZeros = Number.POSITIVE_INFINITY;
  let _result = Number.POSITIVE_INFINITY;
  for(let i = 0; i < layers; i++) {
    const layer = arr.slice(150 * i, 150 * (i + 1)).split('');
    const _numberOfZeros = layer.filter(x => x === '0').length;
    if(_numberOfZeros < numberOfZeros) {
      numberOfZeros = _numberOfZeros;
      _result = layer.filter(x => x === '1').length * layer.filter(x => x === '2').length
    }
  }
  const result = _result;
  console.log(result);
  return result;
};

const printImage = (_img) => {
  const img = _img.replaceAll('1', 'X').replaceAll('0', ' ')
  const layers = img.length / 25;
  for(let i = 0; i < layers; i++) {
    console.log(img.slice(25 * i, 25 * (i + 1)))
  }
}

const second = (arr) => {
  let resultImage = arr.slice(0, 150).split('');
  const layers = arr.length / 150;
  for(let i = 1; i < layers; i++) {
    const layer = arr.slice(150 * i, 150 * (i + 1));
    for(let j = 0; j < 150; j++) {
      if(resultImage[j] === '2' && layer[j] !== '2') resultImage[j] = layer[j]
    }
  }
  printImage(resultImage.join(''));

  const result = 0;
  return result;
};

const data = getFileContent("input.txt");
console.assert(first(data) === 1716, "Not matching first part");
console.assert(second(data) === 0, "Not matching second part");
