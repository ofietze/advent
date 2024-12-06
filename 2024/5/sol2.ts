import fs from "fs";

// Parsing
const fileContent = fs.readFileSync("./2024/5/in.txt", "utf8");
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
  const correctedLine: number[] = line;
  for (const ordering of relevantOrderings) {
    if (!(line.indexOf(ordering[0]) < line.indexOf(ordering[1]))) {
      // Construct correctly ordered line from orderings
      for (const ordering of relevantOrderings) {
        const index0 = correctedLine.indexOf(ordering[0]);
        const index1 = correctedLine.indexOf(ordering[1]);
        if (index0 < 0 && index1 < 0) {
          // Just insert
          correctedLine.push(ordering[0]);
          correctedLine.push(ordering[1]);
        } else if (index0 < 0 && index1 >= 0) {
          // Insert 0 before 1
          correctedLine.splice(index1, 0, ordering[0]);
        } else if (index0 >= 0 && index1 < 0) {
          // Insert 1 at the end
          correctedLine.push(ordering[1]);
        } else if (index0 < index1) {
          // Correctly ordered nothing to do
        } else if (index0 >= 0 && index1 >= 0) {
          // Delete 0 and insert before 1
          correctedLine.splice(index0, 1);
          correctedLine.splice(index1, 0, ordering[0]);
        }
      }
      sum += correctedLine[Math.floor(line.length / 2)];
      break;
    }
  }
}

console.log(sum);
