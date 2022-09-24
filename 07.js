import { getFileContent, getDataAsArrayOfNumbers } from './utils.js';

class Amplifier {
  constructor(arr, input) {
    this.arr = JSON.parse(JSON.stringify(arr));
    this.input = input;
    this.currentIndex = 0;
    this.isHalted = false;
    this.output = [];
    this.a = 0;
    this.b = 0;
    this.c = 0;
    this.first = '';
    this.second = '';
    this.op = '';
    this.regex = /(?<third>\d)(?<second>\d)(?<first>\d)(?<op>\d{2})/;
  }

  getCurrentInstructionWithParameters() {
    return this.arr[this.currentIndex].toString().padStart(5, '0');
  }

  parseCurrentInstruction() {
    const matches = this.getCurrentInstructionWithParameters().match(this.regex).groups;
    this.op = matches.op;
    this.first = matches.first;
    this.second = matches.second;
  }

  processParameterModes() {
    const tmp = parseInt(this.getCurrentInstructionWithParameters().split('').slice(4, 6).join(''));
    if (new Set([3, 4]).has(tmp)) {
      this.a = this.arr[this.currentIndex + 1];
      this.b = this.arr[this.currentIndex + 2];
      return;
    }
    this.a = this.arr[this.currentIndex + 1];
    this.b = this.arr[this.currentIndex + 2];
    this.c = this.arr[this.currentIndex + 3];
  }

  processSum() {
    const val1 = parseInt(this.first) === 0 ? this.arr[this.a] : this.a;
    const val2 = parseInt(this.second) === 0 ? this.arr[this.b] : this.b;
    this.arr[this.c] = val1 + val2;
    this.currentIndex += 4;
  }

  processProduct() {
    const val1 = parseInt(this.first) === 0 ? this.arr[this.a] : this.a;
    const val2 = parseInt(this.second) === 0 ? this.arr[this.b] : this.b;
    this.arr[this.c] = val1 * val2;
    this.currentIndex += 4;
  }

  processInput() {
    this.arr[this.a] = this.input.shift();
    this.currentIndex += 2;
  }

  processOutput() {
    const value = parseInt(this.first) === 0 ? this.arr[this.a] : this.a;
    if (value !== 0) {
      this.output.push(value);
      this.isHalted = true;
    }
    this.currentIndex += 2;
  }

  processJumpIfTrue() {
    const val1 = parseInt(this.first) === 0 ? this.arr[this.a] : this.a;
    if (val1 !== 0) {
      this.currentIndex = parseInt(this.second) === 0 ? this.arr[this.b] : this.b;
    } else {
      this.currentIndex += 3;
    }
  }

  processJumpIfFalse() {
    const val1 = parseInt(this.first) === 0 ? this.arr[this.a] : this.a;
    if (val1 === 0) {
      this.currentIndex = parseInt(this.second) === 0 ? this.arr[this.b] : this.b;
    } else {
      this.currentIndex += 3;
    }
  }

  processLessThan() {
    const val1 = parseInt(this.first) === 0 ? this.arr[this.a] : this.a;
    const val2 = parseInt(this.second) === 0 ? this.arr[this.b] : this.b;
    this.arr[this.c] = val1 < val2 ? 1 : 0;
    this.currentIndex += 4;
  }

  processEquals() {
    const val1 = parseInt(this.first) === 0 ? this.arr[this.a] : this.a;
    const val2 = parseInt(this.second) === 0 ? this.arr[this.b] : this.b;
    this.arr[this.c] = val1 === val2 ? 1 : 0;
    this.currentIndex += 4;
  }

  process() {
    while (this.arr[this.currentIndex] !== 99) {
      this.parseCurrentInstruction();
      this.processParameterModes();
      const opNumber = parseInt(this.op);
      if (opNumber === 1) this.processSum();
      else if (opNumber === 2) this.processProduct();
      else if (opNumber === 3) this.processInput();
      else if (opNumber === 4) this.processOutput();
      else if (opNumber === 5) this.processJumpIfTrue();
      else if (opNumber === 6) this.processJumpIfFalse();
      else if (opNumber === 7) this.processLessThan();
      else if (opNumber === 8) this.processEquals();
      else {
        return this.arr[0];
      }
      if (this.isHalted) return this.output[0];
    }
    return this.arr[0];
  }
}

const first = (arr) => {
  let max = 0;
  for (let a = 0; a < 5; a++) {
    for (let b = 0; b < 5; b++) {
      for (let c = 0; c < 5; c++) {
        for (let d = 0; d < 5; d++) {
          for (let e = 0; e < 5; e++) {
            if (new Set([a, b, c, d, e]).size !== 5) continue;
            const amp1 = new Amplifier(arr, [a, 0]);
            const out1 = amp1.process();
            const amp2 = new Amplifier(arr, [b, out1]);
            const out2 = amp2.process();
            const amp3 = new Amplifier(arr, [c, out2]);
            const out3 = amp3.process();
            const amp4 = new Amplifier(arr, [d, out3]);
            const out4 = amp4.process();
            const amp5 = new Amplifier(arr, [e, out4]);
            const out5 = amp5.process();
            if (out5 > max) max = out5;
          }
        }
      }
    }
  }
  console.log(max);
  return max;
};

const second = (arr) => {
  const result = multiProcessPart2(arr, 0);
  console.log(result);
  return result;
};

const data = getDataAsArrayOfNumbers(getFileContent('input.txt'), ',');
console.assert(first(data) === 255590, 'Not matching first part');
// console.assert(second(data) === 0, "Not matching second part");
