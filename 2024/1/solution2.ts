import { parseInput } from "../../InputParser";

export interface IHash {
  [index: number]: number;
}

const toOccurrenceHashMap = (nums: number[]) => {
  const map: IHash = {};
  for (const num of nums) {
    map[num] = map[num] ? map[num] + 1 : 1;
  }
  return map;
};

const calculateSimilarity = (first: number[], second: number[]) => {
  first = first.sort();
  let distance = 0;

  const occurrences = toOccurrenceHashMap(second);

  for (const num of first) {
    distance += num * (occurrences[num] ?? 0);
  }
  return distance;
};

const input = parseInput("./2024/1/input.txt", /\s{3}|\n/);

const line1 = [];
const line2 = [];
let isLine1 = true;
for (const num of input) {
  if (isLine1) {
    line1.push(num);
  } else {
    line2.push(num);
  }
  isLine1 = !isLine1;
}

const numberLine1 = line1.map((s) => parseInt(s));
const numberLine2 = line2.map((s) => parseInt(s));

const similarity = calculateSimilarity(numberLine1, numberLine2);
console.log(similarity);
