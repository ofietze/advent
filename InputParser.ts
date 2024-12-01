import fs from "fs";

export const parseInput = (fileName: string, regex: RegExp): string[] => {
  const fileContent = fs.readFileSync(fileName, "utf8");
  return fileContent.split(regex);
};

export const getNumbersFromLine = (s: string): number[] => {
  const numberAsChars = s.split(":")[1].split(" ");
  const numbers = [];
  for (const char of numberAsChars) {
    if (char.match(/\d/)) {
      numbers.push(parseInt(char));
    }
  }
  return numbers;
};
