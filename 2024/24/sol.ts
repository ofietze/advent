import fs from "fs";

const fileContent = fs.readFileSync("./2024/24/input.txt", "utf8");
const sections = fileContent.split("\n\n");

const wireValues = sections[0].matchAll(/(.{3}):\s(\d)/gm);
const logicTerms = sections[1].matchAll(
  /(\S{3})\s(\S{2,3})\s(\S{3})\s->\s(\S{3})/gm
);

const map = new Map<string, number>();

// Save input wire values
for (const wValue of wireValues) {
  map.set(wValue[1], parseInt(wValue[2]));
}

// Add all needed calculations to an array
const calculations: {
  operand1: string;
  operation: string;
  operand2: string;
  target: string;
}[] = [];
for (const lTerm of logicTerms) {
  const operand1 = lTerm[1];
  const operation = lTerm[2];
  const operand2 = lTerm[3];
  const target = lTerm[4];
  calculations.push({ operand1, operand2, operation, target });
}

// Now work through that array
while (calculations.length > 0) {
  for (let index = 0; index < calculations.length; index++) {
    const calc = calculations[index];
    const operand1Val = map.get(calc.operand1);
    const operand2Val = map.get(calc.operand2);
    if (typeof operand1Val !== "number" || typeof operand2Val !== "number") {
      continue;
    }
    let result;
    switch (calc.operation) {
      case "AND":
        result = operand1Val & operand2Val;
        break;
      case "OR":
        result = operand1Val | operand2Val;
        break;
      case "XOR":
        result = operand1Val ^ operand2Val;
        break;
      default:
        result = -1;
        break;
    }
    map.set(calc.target, result);
    calculations.splice(index, 1);
  }
}

for (let index = 0; index < 50; index++) {
  if (index < 10) {
    console.log(map.get(`z0${index}`));
  } else {
    console.log(map.get(`z${index}`));
  }
}
