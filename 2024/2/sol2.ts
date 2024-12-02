import { parseInput } from "../../InputParser";
import { isReportSafe } from "./sol1";

const isReportSafeWithDampener = (report: number[]) => {
  if (isReportSafe(report)) {
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    const modifiedReport = [...report];
    modifiedReport.splice(i, 1);
    if (isReportSafe(modifiedReport)) {
      return true;
    }
  }

  return false;
};

const input = parseInput("./2024/2/input.txt", /\n/);
const reports = input.map((line) =>
  line.split(/\s/).map((entry) => parseInt(entry))
);

const safeReports = reports.filter(isReportSafeWithDampener);
console.log(safeReports.length);
