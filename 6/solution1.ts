import { parseTimeAndDistance } from "./parseTimeAndDistance";
const { times, distances } = parseTimeAndDistance("6/puzzleInput.txt");
const canBeatRecord: number[] = [0, 0, 0, 0];

for (let i = 0; i < times.length; i++) {
  const time = times[i];
  // Skip holding button 0 seconds and {time} seconds
  for (let secondsHeld = 1; secondsHeld < time; secondsHeld++) {
    const raceTime = time - secondsHeld;
    if (secondsHeld * raceTime > distances[i]) {
      canBeatRecord[i]++;
    }
  }
}

console.log(canBeatRecord);
const product = canBeatRecord.reduce((a, b) => a * b);
console.log(product);
