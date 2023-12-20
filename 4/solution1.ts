import fs from "fs";
import { convertToNumberArrays } from "./convertToNumbers";

const fileContent = fs.readFileSync("4/puzzleInput.txt", "utf8");
const lines = fileContent.split("\n");

const numberArrays = convertToNumberArrays(lines);

let hitSum = 0;
for (const card of numberArrays) {
  let hits = 0;
  for (const num of card.pickedNumbers) {
    if (card.winningNumbers.includes(num)) hits++;
  }
  if (hits > 0) {
    hitSum += Math.pow(2, hits - 1);
  }
}

console.log(hitSum);
