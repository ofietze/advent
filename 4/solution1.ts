import fs from "fs";
const fileContent = fs.readFileSync("4/puzzleInput.txt", "utf8");
const lines = fileContent.split("\n");

const getNumberArray = (arr: string): number[] => {
  const numberArr = arr
    .replace("  ", " ")
    .split(" ")
    .map((s) => parseInt(s, 10));
  numberArr.forEach((elem, index) => {
    if (Number.isNaN(elem)) {
      numberArr.splice(index, 1);
    }
  });
  return numberArr;
};

const convertToNumberArrays = (lines: string[]) => {
  const numberArrays: { winningNumbers: number[]; pickedNumbers: number[] }[] =
    [];
  for (let line of lines) {
    line = line.split(":")[1];
    const winningNumbersString = line.split("|")[0];
    const winningNumbers = getNumberArray(winningNumbersString);
    const pickedNumbersString = line.split("|")[1];
    const pickedNumbers = getNumberArray(pickedNumbersString);
    numberArrays.push({ winningNumbers, pickedNumbers });
  }
  return numberArrays;
};

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
