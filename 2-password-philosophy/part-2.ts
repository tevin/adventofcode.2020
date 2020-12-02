import { createReadStream } from 'fs';
import { createInterface } from 'readline';

let count = 0;
const MATCH_RULES = /(\d+)-(\d+)\s(\w):\s(\w*)/

const rl = createInterface({
  input: createReadStream(`${__dirname}/input.txt`),
  crlfDelay: Infinity
});

rl.on('line', async (line: string) => {
  await new Promise((_resolve, _reject) => {
    const [_, firstPositionStr, secondPositionStr, letter, password] = line.match(MATCH_RULES) || []
    const letterInFirstPosition = password.charAt(+firstPositionStr - 1) === letter ? 1 : 0
    const letterInSecondPosition = password.charAt(+secondPositionStr - 1) === letter ? 1 : 0
    if (letterInFirstPosition ^ letterInSecondPosition) count++
  })
});

rl.on('close', () => console.log(count))