import * as fs from "fs";
const isPartNumber = (char: string): boolean => {
  return /[0-9]/.test(char);
};

const isSymbol = (char: string): boolean => {
  return /[^0-9.]/.test(char);
};

const isAdjacentToSymbol = (
  engine: string[][],
  i: number,
  j: number
): boolean => {
  return (
    (i > 0 && isSymbol(engine[i - 1][j])) || // Above
    (i < engine.length - 1 && isSymbol(engine[i + 1][j])) || // Below
    (j > 0 && isSymbol(engine[i][j - 1])) || // Left
    (j < engine[i].length - 1 && isSymbol(engine[i][j + 1])) || // Right
    (i > 0 && j > 0 && isSymbol(engine[i - 1][j - 1])) || // Top Left
    (i > 0 && j < engine[i].length - 1 && isSymbol(engine[i - 1][j + 1])) || // Top Right
    (i < engine.length - 1 && j > 0 && isSymbol(engine[i + 1][j - 1])) || // Bottom Left
    (i < engine.length - 1 &&
      j < engine[i].length - 1 &&
      isSymbol(engine[i + 1][j + 1]))
  ); // Bottom Right
};

const calculateSumOfAdjacentPartNumbers = (engine: string[][]): number => {
  let sum = 0;
  for (let i = 0; i < engine.length; i++) {
    let currentNumber = "";
    let foundAdjacentSymbol = false;
    for (let j = 0; j < engine[i].length; j++) {
      const currentSymbol = engine[i][j];
      if (isPartNumber(currentSymbol)) {
        currentNumber = currentNumber.concat(currentSymbol);
        // Check if number is adjacent to a symbol
        foundAdjacentSymbol =
          foundAdjacentSymbol || isAdjacentToSymbol(engine, i, j);
        if (
          foundAdjacentSymbol &&
          // End of line or number ends
          (j === engine[i].length - 1 ||
            (j < engine[i].length - 1 && !isPartNumber(engine[i][j + 1])))
        ) {
          // Add number to total
          const number = parseInt(currentNumber, 10);
          sum += number;
        }
      } else {
        currentNumber = "";
        foundAdjacentSymbol = false;
      }
    }
  }
  return sum;
};

const readEngineSchematicFromFile = (filePath: string): string[][] => {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  return lines.map((line) => line.split(""));
};
const filePath = "3/puzzleInput.txt";
const engineSchematic = readEngineSchematicFromFile(filePath);

const sumOfAdjacentPartNumbers =
  calculateSumOfAdjacentPartNumbers(engineSchematic);

console.log("Sum of Adjacent Part Numbers:", sumOfAdjacentPartNumbers);
