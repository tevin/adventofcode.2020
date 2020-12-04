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

const mandatoryFields = {
  byr: (byr: string) => (+byr >= 1920 && +byr <= 2002),
  hgt: (hgt: string) => {
    const [_, height, unit] = hgt.match(/(\d+)(cm|in)/) || []
    return (unit === 'cm' && +height >= 150 && +height <= 193) || (unit === 'in' && +height >= 59 && +height <= 76)
  },
  hcl: (hcl: string) => (hcl.match(/#([a-f]|[0-9]){6}/) || []).length > 0,
  ecl: (ecl: string) => ['amb','blu','brn','gry','grn','hzl','oth'].includes(ecl),
  pid: (pid: string) => (pid.match(/^\d{9}$/gm) || []).length > 0
}

const passports = readFileSync(`${__dirname}/input.txt`).toString('utf-8').split(`\n\n`)
const validPassports = passports.reduce((acc: number, passport: string) => {
  return acc + +!!(passport.split(/\s|:/)
    .map((val, idx, arr) => (idx % 2 === 0) ? [val as keyof typeof  mandatoryFields, arr[idx+1]] : false)
    .filter(Boolean)
    .reduce((acc, current) => { return acc && current && mandatoryFields[current[0]](current[1])}, true)
    )}, 
  0)

console.log(validPassports)
