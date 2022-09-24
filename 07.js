import { getFileContent, getDataAsArrayOfNumbers } from './utils.js';

class Amplifier {
  constructor(arr, input = null) {
    this.arr = JSON.parse(JSON.stringify(arr));
    this.input = input;
    this.currentIndex = 0;
    this.isHalted = false;
    this.isPaused = false;
    this.output = [];
    this.a = 0;
    this.b = 0;
    this.c = 0;
    this.first = '';
    this.second = '';
    this.op = '';
    this.regex = /(?<third>\d)(?<second>\d)(?<first>\d)(?<op>\d{2})/;
  }

  setInput(input) {
    this.input = input;
  }

  pushToInput(value) {
    this.input.push(value);
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
      this.isPaused = true;
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
      if (this.isPaused) {
        this.isPaused = false;
        const val = this.output.shift();
        return val;
      }
    }
    this.isHalted = true;
    return this.arr[0];
  }
}

const first = (arr) => {
  let [ from, to ] = [ 0, 5 ]
  let max = 0;
  for (let a = from; a < to; a++) {
    for (let b = from; b < to; b++) {
      for (let c = from; c < to; c++) {
        for (let d = from; d < to; d++) {
          for (let e = from; e < to; e++) {
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
  let [ from, to ] = [ 5, 10 ]
  let max = 0;
  for (let a = from; a < to; a++) {
    for (let b = from; b < to; b++) {
      for (let c = from; c < to; c++) {
        for (let d = from; d < to; d++) {
          for (let e = from; e < to; e++) {
            if (new Set([a, b, c, d, e]).size !== 5) continue;
            const vals = [a, b, c, d, e];
            const amps = [...Array(6)].map(x => new Amplifier(arr));
            amps[0].setInput([ a, 0 ]);
            let index = 0;
            while(!amps[4].isHalted) {
              let tmpOutput = amps[index].process();
              if (index === 4 && tmpOutput > max) {
                max = tmpOutput;
              }
              let nextAmpIndex = (index + 1) % 5;
              if(amps[nextAmpIndex].input === null) {
                amps[nextAmpIndex].setInput([ vals[nextAmpIndex], tmpOutput]);
              } else {
                amps[nextAmpIndex].pushToInput(tmpOutput);
              }
              index = (index + 1) % 5;
            }
          }
        }
      }
    }
  }
  console.log(max);
  return max;
};

const data = getDataAsArrayOfNumbers(getFileContent('input.txt'), ',');
console.assert(first(data) === 255590, 'Not matching first part');
console.assert(second(data) === 58285150, "Not matching second part");
