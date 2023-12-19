import * as fs from 'fs';

// Function to check if a character is a part number or symbol
const isPartNumber = (char: string): boolean => {
  return /[0-9]/.test(char);
}

const isSymbol = (char: string): boolean => {
    return /[^0-9.]/.test(char);
  }

// Function to calculate the sum of all part numbers adjacent to symbols
function calculateSumOfAdjacentPartNumbers(engine: string[][]): number {
  let sum = 0;
  for (let i = 0; i < engine.length; i++) {
    let currentNumber = ''
    let founAdjacentSymbol = false;
    for (let j = 0; j < engine[i].length; j++) {
      const currentSymbol = engine[i][j];
      if (isPartNumber(currentSymbol)) {    
        
        // Check if any adjacent character is not a part number
        const isAdjacentToSymbol =
          i > 0 && isSymbol(engine[i - 1][j]) || // Above
          i < engine.length - 1 && isSymbol(engine[i + 1][j]) || // Below
          j > 0 && isSymbol(engine[i][j - 1]) || // Left
          j < engine[i].length - 1 && isSymbol(engine[i][j + 1]) || // Right
          i > 0 && j > 0 && isSymbol(engine[i - 1][j - 1]) || // Top Left
          i > 0 && j < engine[i].length - 1 && isSymbol(engine[i - 1][j + 1]) || // Top Right
          i < engine.length - 1 && j > 0 && isSymbol(engine[i + 1][j - 1]) || // Bottom Left
          i < engine.length - 1 && j < engine[i].length - 1 && isSymbol(engine[i + 1][j + 1]); // Bottom Right

        currentNumber = currentNumber.concat(currentSymbol)
        founAdjacentSymbol = founAdjacentSymbol || isAdjacentToSymbol      
        if (founAdjacentSymbol && (j === engine[i].length - 1 || (j < engine[i].length - 1 && !isPartNumber(engine[i][j+1])))) { // End of line. or number ends    
            // Extract multi-digit numbers
            const number = parseInt(currentNumber, 10)
            sum += number;
        }
      } else {
        currentNumber = '';
        founAdjacentSymbol = false
      }
    }
  }
  return sum;
}

// Function to read the engine schematic from a file
const readEngineSchematicFromFile = (filePath: string): string[][] => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  return lines.map((line) => line.split(''));
}
const filePath = '3/puzzleInput.txt'; // Replace with the actual path to your input file
const engineSchematic = readEngineSchematicFromFile(filePath);

const sumOfAdjacentPartNumbers = calculateSumOfAdjacentPartNumbers(engineSchematic);

console.log("Sum of Adjacent Part Numbers:", sumOfAdjacentPartNumbers);