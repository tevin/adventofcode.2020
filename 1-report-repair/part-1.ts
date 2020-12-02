import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const rl = createInterface({
  input: createReadStream(`${__dirname}/input.txt`),
  crlfDelay: Infinity
});

const seenAlready = new Set<number>() // apparently sets in js are not always O(1) ? 
rl.on('line', async (expense: string) => {
  const difference = 2020 - +expense
  if (seenAlready.has(difference)) {
    console.log(+expense * difference)
    rl.close()
  }
  seenAlready.add(+expense)
});