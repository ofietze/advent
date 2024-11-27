import fs from "fs";
const fileContent = fs.readFileSync("2/puzzleInput.txt", "utf8");
const lines = fileContent.split("\n");

let sum = 0;

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

const checkForMinNeeded = (drawList: string): number[] => {
  const draws = drawList.split(";");
  const maxCountForColor = [0, 0, 0];
  for (const draw of draws) {
    const colorCount = parseColors(draw);
    for (let index = 0; index < colorCount.length; index++) {
      if (colorCount[index] > maxCountForColor[index]) {
        maxCountForColor[index] = colorCount[index];
      }
    }
  }
  return maxCountForColor;
};

for (let index = 0; index < lines.length; index++) {
  const minColorCombo = checkForMinNeeded(lines[index].split(":")[1]);
  sum += minColorCombo.reduce((a, b) => a * b);
}
console.log(sum);
