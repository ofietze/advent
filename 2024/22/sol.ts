import fs from "fs";

const fileContent = fs.readFileSync("./2024/22/input.txt", "utf8");
const lines = fileContent.split("\n");
const nums: number[] = [];

for (const line of lines) {
  nums.push(parseInt(line));
}

const results: number[] = [];
for (const n of nums) {
  let secret = n;
  const p = 16777216;
  const limit = 2000;
  const prune = (n: number) => ((n % p) + p) % p;
  for (let index = 0; index < limit; index++) {
    secret = prune((secret * 64) ^ secret);
    secret = prune(Math.floor(secret / 32) ^ secret);
    secret = prune((secret * 2048) ^ secret);
  }
  results.push(secret);
}

console.log(results.reduce((prev, curr) => prev + curr));
