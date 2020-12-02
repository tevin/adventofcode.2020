const {createReadStream} = require('fs')
const {createInterface} = require('readline')

let count = 0;
const MATCH_RULES = /(\d+)-(\d+)\s(\w):\s(\w*)/

const rl = createInterface({
  input: createReadStream(`${__dirname}/input.txt`),
  crlfDelay: Infinity
});

rl.on('line', async (line: string) => {
  await new Promise((_resolve, _reject) => {
    const [_, minOccurencesStr, maxOccurencesStr, letter, password] = line.match(MATCH_RULES) || []
    const minOccurences = +minOccurencesStr
    const maxOccurences = +maxOccurencesStr
    const occurences = (password.match(new RegExp(letter, 'g'))||[]).length
    if(minOccurences <=  occurences && maxOccurences >=occurences) count++ 
  })
});

rl.on('close', () => console.log(count))