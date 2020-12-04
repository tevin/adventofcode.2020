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
const mandatoryFieldsStr = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const mandatoryFields = {
  byr: (byr: string) => (+byr >= 1920 && +byr <= 2002),
  hgt: (hgt: string) => {
    const [_, height, unit] = hgt.match(/(\d+)(cm|in)/) || []
    return (unit === 'cm' && +height >= 150 && +height <= 193) || (unit === 'in' && +height >= 59 && +height <= 76)
  },
  hcl: (hcl: string) => (hcl.match(/#([a-f]|[0-9]){6}/) || []).length > 0,
  ecl: (ecl: string) => ['amb','blu','brn','gry','grn','hzl','oth'].includes(ecl),
  pid: (pid: string) => (pid.match(/^\d{9}$/gm) || []).length > 0,
  iyr: (iyr: string) => (+iyr >= 2010 && +iyr <= 2020),
  eyr: (eyr: string) => (+eyr >= 2020 && +eyr <= 2030),
  cid: (cid: string) => true
}

const passports = readFileSync(`${__dirname}/input.txt`).toString('utf-8').split(`\n\n`)
const validPassports = passports.reduce((acc: number, passport: string) => {
  const flatPassport = passport.split(/\s|:/)
  if (!(mandatoryFieldsStr.every((mandatoryField) => flatPassport.includes(mandatoryField)))) return acc
  return acc + +!!(
    flatPassport
      .map((val, idx, arr) => (idx % 2 === 0) ? [val, arr[idx+1]] : false)
      .filter(Boolean)
      .reduce((validSoFar, current) => { return validSoFar && current && mandatoryFields[current[0] as keyof typeof mandatoryFields](current[1])}, true))
  }, 0)

console.log(validPassports)
