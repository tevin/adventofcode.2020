import {readFileSync} from 'fs'

const trajectoryMap = readFileSync(`${__dirname}/input.txt`).toString('utf-8').split(`\n`)

const slopes = [
  // {
  //   right: 1,
  //   down: 1,
  //   count: 0
  // },
  // {
  //   right: 3,
  //   down: 1,
  //   count: 0
  // },
  // {
  //   right: 5,
  //   down: 1,
  //   count: 0
  // },
  // {
  //   right: 7,
  //   down: 1,
  //   count: 0
  // },
  {
    right: 1,
    down: 2,
    count: 0
  },
]

trajectoryMap.map((line, y) => {
  slopes.map((slope) => {
    if (y % slope.down !== 0) return
    let point = line.charAt((slope.right * y) % line.length)
    if (point === '#') slope.count++
  })
})

console.log(slopes.reduce((acc, curr) => {return acc * curr.count}, 1))
/**
 * [
  {
    right: 1,
    down: 1,
    count: 87,
  },
  {
    right: 3,
    down: 1,
    count: 169,
  },
  {
    right: 5,
    down: 1,
    count: 99,
  },
  {
    right: 7,
    down: 1,
    count: 98,
  },
  {
    right: 1,
    down: 2,
    count: 43,
  },
]
 */