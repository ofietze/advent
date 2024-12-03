import fs from "fs";

const fileContent = fs.readFileSync("./2024/3/input.txt", "utf8");
const terms = fileContent.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

let sum = 0;
for (const term of terms) {
  sum += parseInt(term[1]) * parseInt(term[2]);
}
console.log(sum);

// Check this later /(?<=^|do\(\)|(?<!don't\(\)(?:(?!do\(\)).)*))mul\((\d{1,3}),(\d{1,3})\)/g
const termsEnabled = fileContent.matchAll(
  /mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/g
);
let sumEnabled = 0;
let enabled = true;
for (const term of termsEnabled) {
  if (term[0] === "do()") {
    enabled = true;
    continue;
  }
  if (term[0] === "don't()") {
    enabled = false;
    continue;
  }
  sumEnabled += enabled ? parseInt(term[1]) * parseInt(term[2]) : 0;
}
console.log(sumEnabled);
