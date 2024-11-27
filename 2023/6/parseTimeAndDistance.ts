import fs from "fs";

const getNumbers = (s: string): number[] => {
  const numberAsChars = s.split(":")[1].split(" ");
  const numbers = [];
  for (const char of numberAsChars) {
    if (char.match(/\d/)) {
      numbers.push(parseInt(char));
    }
  }
  return numbers;
};

export const parseTimeAndDistance = (fileName: string) => {
  const fileContent = fs.readFileSync(fileName, "utf8");
  const lines = fileContent.split("\n");
  const times = getNumbers(lines[0]);
  const distances = getNumbers(lines[1]);
  return { times, distances };
};
