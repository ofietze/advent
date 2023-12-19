import * as fs from 'fs';

// Function to check if a character is a part number or symbol
const isPartNumber = (char: string): boolean => {
  return /[0-9]/.test(char);
}

const isGear = (char: string): boolean => {
    return /[*]/.test(char);
  }

  const isAdjacentToGear = (engine: string[][], i:number, j:number) => {
          if (i > 0 && isGear(engine[i - 1][j])) return `${i-1} ${j}` // Above
          if(i < engine.length - 1 && isGear(engine[i + 1][j])) return `${i+1} ${j}` // Below
          if(j > 0 && isGear(engine[i][j - 1])) return `${i} ${j-1}`  // Left
          if(j < engine[i].length - 1 && isGear(engine[i][j + 1])) return `${i} ${j+1}` // Right
          if(i > 0 && j > 0 && isGear(engine[i - 1][j - 1])) return `${i-1} ${j-1}` // Top Left
          if(i > 0 && j < engine[i].length - 1 && isGear(engine[i - 1][j + 1])) return `${i-1} ${j+1}` // Top Right
          if(i < engine.length - 1 && j > 0 && isGear(engine[i + 1][j - 1])) return `${i+1} ${j-1}` // Bottom Left
          if(i < engine.length - 1 && j < engine[i].length - 1 && isGear(engine[i + 1][j + 1])) return `${i+1} ${j+1}` // Bottom Right
          return null
        }

// Function to calculate the sum of all part numbers adjacent to symbols
function calculateSumOfGearRatios(engine: string[][]): number {
  const gears: Record<string, number[]> = {}
  for (let i = 0; i < engine.length; i++) {
    let currentNumber = ''
    let currentGear = null;

    for (let j = 0; j < engine[i].length; j++) {
      const currentSymbol = engine[i][j];
      if (isPartNumber(currentSymbol)) {    
        // Check if any adjacent character is not a part number
        currentNumber = currentNumber.concat(currentSymbol)
        currentGear = currentGear || isAdjacentToGear(engine, i, j)      
        if (currentGear && (j === engine[i].length - 1 || (j < engine[i].length - 1 && !isPartNumber(engine[i][j+1])))) { // End of line. or number ends    
            // Extract multi-digit numbers
            if (!gears[currentGear]) {
                gears[currentGear] = [parseInt(currentNumber)]
            } else {
                gears[currentGear].push(parseInt(currentNumber))
            }
        }
      } else {
        currentNumber = '';
        currentGear = null
      }
    }
  }
  let sum = 0
  for (const numbers of Object.values(gears)) {
    if (numbers.length === 2) {
        sum += numbers.reduce((a,b) => a*b)
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

const sumOfAdjacentPartNumbers = calculateSumOfGearRatios(engineSchematic);

console.log("Sum of all gear ratios:", sumOfAdjacentPartNumbers);