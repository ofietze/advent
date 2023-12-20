const getNumberArray = (arr: string): number[] => {
    const numberArr = arr
      .replace("  ", " ")
      .split(" ")
      .map((s) => parseInt(s, 10));
    numberArr.forEach((elem, index) => {
      if (Number.isNaN(elem)) {
        numberArr.splice(index, 1);
      }
    });
    return numberArr;
};
  
export const convertToNumberArrays = (lines: string[]) => {
    const numberArrays: { winningNumbers: number[]; pickedNumbers: number[] }[] =
      [];
    for (let line of lines) {
      line = line.split(":")[1];
      const winningNumbersString = line.split("|")[0];
      const winningNumbers = getNumberArray(winningNumbersString);
      const pickedNumbersString = line.split("|")[1];
      const pickedNumbers = getNumberArray(pickedNumbersString);
      numberArrays.push({ winningNumbers, pickedNumbers });
    }
    return numberArrays;
};