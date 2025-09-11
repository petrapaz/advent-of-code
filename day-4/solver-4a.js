const fs = require("fs");

function countFullOverlaps(input) {
  //Split the input into individual lines and filter out any empty lines
  const pairs = input.trim().split("\n");

  let fullContainCount = 0;

  for (const pair of pairs) {
      //Parse the line to get the two ranges
      const [range1, range2] = pair.split(",");

      //Get the start and end numbers for each range
      //The map function goes through each value in the array and returns a new array with the results of the function applied to each element.
      const [start1, end1] = range1.split("-").map(Number);
      const [start2, end2] = range2.split("-").map(Number);

      //Check for the full containment conditions
      const isFirstContainingSecond = start1 <= start2 && end1 >= end2;
      const isSecondContainingFirst = start2 <= start1 && end2 >= end1;

      if (isFirstContainingSecond || isSecondContainingFirst) {
        fullContainCount++;
      }
  }
  return fullContainCount;
}

try {
  const puzzleInput = fs.readFileSync("input-4.txt", "utf-8");
  const result = countFullOverlaps(puzzleInput);
  console.log(`Part 1 - fully contained pairs: ${result}`);
} catch (err) {
  console.error("Error: ", err.message);
}
