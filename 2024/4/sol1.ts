import fs from "fs";

const fileContent = fs.readFileSync("./2024/4/input.txt", "utf8");

const checkIndices = (mIndex: number, aIndex: number, sIndex: number) => {
  const maxChar = fileContent.length;
  return (
    mIndex >= 0 &&
    aIndex >= 0 &&
    sIndex >= 0 &&
    mIndex < maxChar &&
    aIndex < maxChar &&
    sIndex < maxChar &&
    fileContent.charAt(mIndex) === "M" &&
    fileContent.charAt(aIndex) === "A" &&
    fileContent.charAt(sIndex) === "S"
  );
};

// "X-Ray tracing"
// S..S..S
// .A.A.A.
// ..MMM..
// SAMXMAS
// ..MMM..
// .A.A.A.
// S..S..S
const checkRight = (index: number) => {
  const mIndex = index + 1;
  const aIndex = index + 2;
  const sIndex = index + 3;
  return checkIndices(mIndex, aIndex, sIndex);
};

const checkLeft = (index: number) => {
  const mIndex = index - 1;
  const aIndex = index - 2;
  const sIndex = index - 3;
  return checkIndices(mIndex, aIndex, sIndex);
};
const checkUp = (index: number) => {
  const mIndex = index - 141;
  const aIndex = index - 282;
  const sIndex = index - 423;
  return checkIndices(mIndex, aIndex, sIndex);
};
const checkDown = (index: number) => {
  const mIndex = index + 141;
  const aIndex = index + 282;
  const sIndex = index + 423;
  return checkIndices(mIndex, aIndex, sIndex);
};
const checkUpLeft = (index: number) => {
  const mIndex = index - 142;
  const aIndex = index - 284;
  const sIndex = index - 426;
  return checkIndices(mIndex, aIndex, sIndex);
};
const checkUpRight = (index: number) => {
  const mIndex = index - 140;
  const aIndex = index - 280;
  const sIndex = index - 420;
  return checkIndices(mIndex, aIndex, sIndex);
};
const checkDownRight = (index: number) => {
  const mIndex = index + 142;
  const aIndex = index + 284;
  const sIndex = index + 426;
  return checkIndices(mIndex, aIndex, sIndex);
};
const checkDownLeft = (index: number) => {
  const mIndex = index + 140;
  const aIndex = index + 280;
  const sIndex = index + 420;
  return checkIndices(mIndex, aIndex, sIndex);
};

let up = 0;
let down = 0;
let left = 0;
let right = 0;
let upLeft = 0;
let upRight = 0;
let downLeft = 0;
let downRight = 0;

let xs = fileContent.matchAll(/X/g);

for (const x of xs) {
  up += checkUp(x.index) ? 1 : 0;
  down += checkDown(x.index) ? 1 : 0;
  left += checkLeft(x.index) ? 1 : 0;
  right += checkRight(x.index) ? 1 : 0;
  upLeft += checkUpLeft(x.index) ? 1 : 0;
  upRight += checkUpRight(x.index) ? 1 : 0;
  downLeft += checkDownLeft(x.index) ? 1 : 0;
  downRight += checkDownRight(x.index) ? 1 : 0;
}

const sumXmas =
  left + right + +up + down + upLeft + upRight + downLeft + downRight;
console.log(sumXmas);
