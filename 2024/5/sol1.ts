import fs from "fs";

const fileContent = fs.readFileSync("./2024/5/input.txt", "utf8");

// Parsing
const input = fileContent.split("\n\n");
const orderings = input[0].matchAll(/(\d{2})\|(\d{2})/g);
const orderingsAsArray: number[][] = [];
for (const ordering of orderings) {
  orderingsAsArray.push([parseInt(ordering[1]), parseInt(ordering[2])]);
}

const updateLines = input[1].split("\n");
const linesAsArray: number[][] = [];
for (const line of updateLines) {
  const numsAsString = line.matchAll(/(\d{2})/g);
  const nums = [];
  for (const num of numsAsString) {
    nums.push(parseInt(num[1]));
  }
  linesAsArray.push(nums);
}

// Calculation
let sum = 0;
for (const line of linesAsArray) {
  const relevantOrderings = [];
  for (const tuple of orderingsAsArray) {
    if (line.includes(tuple[0]) && line.includes(tuple[1])) {
      relevantOrderings.push(tuple);
    }
  }
  let isValid = true;
  for (const ordering of relevantOrderings) {
    if (!(line.indexOf(ordering[0]) < line.indexOf(ordering[1]))) {
      isValid = false;
      break;
    }
  }
  sum += isValid ? line[Math.floor(line.length / 2)] : 0;
}
console.log(sum);
