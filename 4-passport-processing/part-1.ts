import {readFileSync} from 'fs'

/**
byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID) -> Not Mandatory
*/

const mandatoryFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const passports = readFileSync(`${__dirname}/input.txt`).toString('utf-8').split(`\n\n`)
const validPassports = passports.reduce((acc: number, passport: string) => {
  return acc + +!!(mandatoryFields.every((mandatoryField) => passport.split(/\s|:/).includes(mandatoryField)))
}, 0)
console.log(validPassports)