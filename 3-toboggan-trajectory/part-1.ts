import {readFileSync} from 'fs'

let count = 0

const trajectoryMap = readFileSync(`${__dirname}/input.txt`).toString('utf-8').split(`\n`)

/**
 * line -> entire row
 * y -> index
 */
trajectoryMap.map((line, y) => {
  let point = line.charAt((3 * y) % line.length)
  if (point === '#') count++
})

console.log(count)