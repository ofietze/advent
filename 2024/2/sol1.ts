import { parseInput } from "../../InputParser";

export const isReportSafe = (report: number[]) => {
  if (report.length < 2) return true;
  let direction = 0;

  for (let index = 1; index < report.length; index++) {
    const diff = report[index] - report[index - 1];

    if (
      Math.abs(diff) < 1 ||
      Math.abs(diff) > 3 ||
      (direction < 0 && diff > 0) ||
      (direction > 0 && diff < 0)
    ) {
      return false;
    }

    if (index === 1) {
      direction = diff;
    }
  }
  return true;
};

const input = parseInput("./2024/2/input.txt", /\n/);
const reports = input.map((line) =>
  line.split(/\s/).map((entry) => parseInt(entry))
);
const safeReports = reports.filter(isReportSafe);
console.log(safeReports.length);
