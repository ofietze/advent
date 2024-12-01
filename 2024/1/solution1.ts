import { parseInput } from "../../InputParser";

const calculateDistance = (first: number[], second: number[]) => {
  first = first.sort();
  second = second.sort();
  let distance = 0;

  for (let index = 0; index < second.length && index < first.length; index++) {
    distance += Math.abs(first[index] - second[index]);
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

const distance = calculateDistance(numberLine1, numberLine2);
console.log(distance);
