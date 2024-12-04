import fs from "fs";

const fileContent = fs.readFileSync("./2024/4/input.txt", "utf8");

const getCharAt = (index: number) => {
  const maxChar = fileContent.length;
  if (index >= 0 && index < maxChar) return fileContent.charAt(index);
  else return "X";
};

// "MAS-Ray tracing"
// M.S
// .A.
// M.S
// So valid patterns for MS above and below are MSMS,SSMM,MMSS,SMSM
const checkHit = (index: number) => {
  const char0 = getCharAt(index - 142);
  const char1 = getCharAt(index - 140);
  const char2 = getCharAt(index + 140);
  const char3 = getCharAt(index + 142);
  const str = char0.concat(char1, char2, char3);
  return !!str.match(/MSMS|SMSM|SSMM|MMSS/);
};

let hits = 0;

let as = fileContent.matchAll(/A/g);

for (const a of as) {
  hits += checkHit(a.index) ? 1 : 0;
}

console.log(hits);
