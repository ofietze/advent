import { getNumbersFromLine, parseInput } from "../InputParser";

const getNumbers = (s: string): number[] => {
  const numberAsChars = s.split(" ");
  const numbers = [];
  for (const char of numberAsChars) {
    if (char.match(/\d/)) {
      numbers.push(parseInt(char));
    }
  }
  return numbers;
};

const parseMapEntry = (entry: string): number[][] => {
  const lines = entry.split(":")[1].split("\n");
  const mapValues: number[][] = [];
  for (let line of lines) {
    if (line.length > 0) {
      mapValues.push(getNumbers(line));
    }
  }
  return mapValues;
};

export const parseMapsAndSeeds = (fileName: string) => {
  const entries = parseInput(fileName, new RegExp("\n\n"));
  const seeds: number[] = getNumbersFromLine(entries[0]);
  const maps: number[][][] = [];

  for (let index = 1; index < entries.length; index++) {
    maps.push(parseMapEntry(entries[index]));
  }

  return { seeds, maps };
};
