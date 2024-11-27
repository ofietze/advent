import fs from "fs";
let fileContent = fs.readFileSync("6/puzzleInput.txt", "utf8");
const lines = fileContent.split("\n");
const time = parseInt(lines[0].replace(new RegExp(/[^0-9]/, "g"), ""));
const distance = parseInt(lines[1].replace(new RegExp(/[^0-9]/, "g"), ""));
let waysToBeat = 0;

for (let secondsHeld = 1; secondsHeld < time; secondsHeld++) {
  const raceTime = time - secondsHeld;
  if (secondsHeld * raceTime > distance) {
    waysToBeat++;
  }
}

console.log(waysToBeat);
