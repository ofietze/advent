import fs from "fs";
// 1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet

// In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

// Consider your entire calibration document. What is the sum of all of the calibration values?
const getCalibrationValue = (line: string): number => {
  if (line.length === 0) {
    return 0;
  }
  let first = "";
  let latestMatch = "";
  for (const char of line) {
    if (char.match(/[0-9]/)) {
      latestMatch = char;
      if (first.length === 0) {
        first = char;
      }
    }
  }
  let twoDigits = first.concat(latestMatch);

  const result = Number.parseInt(twoDigits);
  return result;
};

const fileContent = fs.readFileSync("1/puzzleInput.txt", "utf8");
const lines = fileContent.split("\n");
let sum = 0;

for (const line of lines) {
  sum += getCalibrationValue(line);
}

console.log(sum);
