import {readFileSync} from 'fs'

const trajectoryMap = readFileSync(`${__dirname}/input.txt`).toString('utf-8').split(`\n`)

const slopes = [
  {
    right: 1,
    down: 1,
    count: 0
  },
  {
    right: 3,
    down: 1,
    count: 0
  },
  {
    right: 5,
    down: 1,
    count: 0
  },
  {
    right: 7,
    down: 1,
    count: 0
  },
  {
    right: 1,
    down: 2,
    count: 0
  },
]

trajectoryMap.map((line, lineNumber) => {
  slopes.map((slope) => {
    if (lineNumber % slope.down !== 0) return
    const x = lineNumber / slope.down
    let point = line.charAt((slope.right * x) % line.length)
    if (point === '#') slope.count++
  })
})

console.log(slopes.reduce((acc, curr) => {return acc * curr.count}, 1))