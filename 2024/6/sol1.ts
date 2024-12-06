import fs from "fs";

const fileContent = fs.readFileSync("./2024/6/input.txt", "utf8");
const lines = fileContent.split("\n");

const mark = (str: string, position: number) => {
  return str.substring(0, position) + "X" + str.substring(position + 1);
};

const walkAndMark = (
  guardPosition: number[],
  direction: number,
  lines: string[]
) => {
  let currentPos = [...guardPosition];

  while (true) {
    lines[currentPos[1]] = mark(lines[currentPos[1]], currentPos[0]);

    let newPosition = [...currentPos];
    switch (direction) {
      case 0:
        // Up
        newPosition[1]--;
        break;
      case 1:
        // Right
        newPosition[0]++;
        break;
      case 2:
        // Down
        newPosition[1]++;
        break;
      case 3:
        // Left
        newPosition[0]--;
        break;
    }

    const isInBounds =
      newPosition[0] >= 0 &&
      newPosition[0] < lines[0].length &&
      newPosition[1] >= 0 &&
      newPosition[1] < lines.length;
    if (!isInBounds) {
      break;
    }

    const isObstacle = lines[newPosition[1]][newPosition[0]] === "#";
    if (isObstacle) {
      // Turn
      direction = (direction + 1) % 4;
    } else {
      // Move
      currentPos = newPosition;
    }
  }
};

// Find guard
const guardLine = lines.findIndex((line) => line.match(/\^/));
const guardPosition = [lines[guardLine].indexOf("^"), guardLine];
// Direction 0: up, 1: right, 2: down, 3:left
const direction = 0;

walkAndMark(guardPosition, direction, lines);
const Xs = lines.join("").match(/X/g)?.length;
console.log(Xs);
