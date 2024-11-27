import fs from "fs";
const fileContent = fs.readFileSync("2/puzzleInput.txt", "utf8");
const lines = fileContent.split("\n");

let sum = 0;
const maxColorCount = [12, 13, 14]; // r,g,b

const parseColors = (game: string): number[] => {
  const colors = game
    .replace(/[^rgb0-9]/g, "")
    .replace(/gr/, "g")
    .split(","); // remove unnecessary chars and split into single colors
  const occurrences = [0, 0, 0]; // r,g,b
  for (const color of colors) {
    let amount = "";
    for (const char of color) {
      if (char.match(/[0-9]/)) {
        amount = amount.concat(char);
      } else {
        switch (char) {
          default:
          case "r":
            occurrences[0] = Number.parseInt(amount);
            break;
          case "g":
            occurrences[1] = Number.parseInt(amount);
            break;
          case "b":
            occurrences[2] = Number.parseInt(amount);
            break;
        }
        amount = "";
      }
    }
  }
  return occurrences;
};

const validateDraw = (game: string): boolean => {
  const colorCount = parseColors(game);
  for (let index = 0; index < colorCount.length; index++) {
    if (colorCount[index] > maxColorCount[index]) return false;
  }
  return true;
};

const validateDraws = (drawList: string): boolean => {
  const draws = drawList.split(";");
  for (const draw of draws) {
    if (!validateDraw(draw)) {
      return false;
    }
  }
  return true;
};

for (let index = 0; index < lines.length; index++) {
  if (validateDraws(lines[index].split(":")[1])) {
    sum += index + 1;
  }
}
console.log(sum);
