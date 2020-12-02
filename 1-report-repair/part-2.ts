import {readFileSync} from 'fs'

const report = readFileSync(`${__dirname}/input.txt`).toString('utf-8').split(`\n`)

for (let outerLoop = 0; outerLoop < report.length; outerLoop++) {
  const seenAlready = new Set<number>()

  const outerLoopExpense = +report[outerLoop]
  const difference = 2020 - outerLoopExpense

  for (let innerLoop = outerLoop + 1; innerLoop < report.length; innerLoop++) {
    const innerLoopExpense = +report[innerLoop]
 
    if (seenAlready.has(difference - innerLoopExpense)) {
      console.log(outerLoopExpense * innerLoopExpense * (difference - innerLoopExpense))
      outerLoop = report.length
      break;
    }
    seenAlready.add(+innerLoopExpense)
  }
}