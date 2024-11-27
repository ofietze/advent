import { parseMapsAndSeeds } from "./parseMapsAndSeeds";

const { seeds, maps } = parseMapsAndSeeds("5/testInput.txt");
const values = seeds;

for (const map of maps) {
  for (let i = 0; i < values.length - 1; i += 2) {
    for (let j = 0; j < values[i + 1]; j++) {
      const currentVal = values[i] + j;
      console.log(currentVal);

      for (const mapLine of map) {
        const source = mapLine[0];
        const destination = mapLine[1];
        const range = mapLine[2];
        if (currentVal >= destination && currentVal < destination + range) {
          values[i] = source + values[i] - destination;

          break;
        }
      }
    }
  }
}
console.log(values);
console.log(values.sort((a, b) => a - b)[0]);
