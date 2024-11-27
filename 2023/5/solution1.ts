import { parseMapsAndSeeds } from "./parseMapsAndSeeds";

const { seeds, maps } = parseMapsAndSeeds("5/puzzleInput.txt");
let values = seeds;

for (const map of maps) {
  for (let i = 0; i < values.length; i++) {
    for (const mapLine of map) {
      const source = mapLine[0];
      const destination = mapLine[1];
      const range = mapLine[2];
      if (values[i] >= destination && values[i] < destination + range) {
        values[i] = source + values[i] - destination;
        break;
      }
    }
  }
}
console.log(values);
console.log(values.sort((a, b) => a - b)[0]);
