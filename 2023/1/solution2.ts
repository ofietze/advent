import fs from "fs";
// 1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet

// In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

// Consider your entire calibration document. What is the sum of all of the calibration values?
const numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const numbersFirstLetter = /[zotfsen]/;
const numbersLastLetter = /[oerxnt]/;

let firstMatch = "";
let lastMatch = "";

// Checks a five char substring for appearances of numbers either as a word or
// a number character. Returns all hits sorted by the index they were found at
const checkForNumWordOrNumber = (subStr: string): number[] => {
  const foundNumbers = [];
  for (let i = 0; i < numbers.length; i++) {
    const res = subStr.search(numbers[i]);
    const num = subStr.indexOf(i.toString());
    if (res >= 0) {
      foundNumbers.push({ number: i, index: res });
    }
    if (num >= 0) {
      foundNumbers.push({ number: i, index: num });
    }
  }
  foundNumbers.sort((a, b) => a.index - b.index);
  const numbersSorted = foundNumbers.map((el) => el.number);
  return numbersSorted;
};

const getCalibrationValue = (line: string): number => {
  // Search from the front
  for (let i = 0; i < line.length; i++) {
    const char = line.charAt(i);
    if (char.match(/[0-9]/)) {
      firstMatch = char;
      break;
    } else if (char.match(numbersFirstLetter)) {
      // There is no word longer five so check that substring
      const res = checkForNumWordOrNumber(line.substring(i, i + 5));
      if (res.length > 0) {
        firstMatch = res[0].toString();
        break;
      }
    }
  }

  // Now search from the back
  for (let i = line.length - 1; i >= 0; i--) {
    const char = line.charAt(i);
    if (char.match(/[0-9]/)) {
      lastMatch = char;
      break;
    } else if (char.match(numbersLastLetter)) {
      // There is no word longer five so check that substring
      const res = checkForNumWordOrNumber(line.substring(i - 5, i + 1));
      if (res.length > 0) {
        lastMatch = res[res.length - 1].toString();
        break;
      }
    }
  }

  const twoDigits = firstMatch.concat(lastMatch);
  const result = Number.parseInt(twoDigits);
  return result;
};

const fileContent = fs.readFileSync("1/puzzleInput.txt", "utf8");
const lines = fileContent.split("\n");
let sum = 0;

for (const line of lines) {
  firstMatch = "";
  lastMatch = "";
  sum += getCalibrationValue(line);
}

console.log(sum);
