import fs from "fs";
const fileContent = fs.readFileSync("2/testInput.txt", "utf8");
const lines = fileContent.split("\n");

for (const line of lines) {
  console.log(line);
}
