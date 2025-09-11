const fs = require("fs");

function countAnyOverlaps(input) {
  const pairs = input.trim().split("\n");
  let overlapCount = 0;

  for (const pair of pairs) {
    const [range1, range2] = pair.split(",");
    const [start1, end1] = range1.split("-").map(Number);
    const [start2, end2] = range2.split("-").map(Number);

    // Look for any overlap
    const overlaps = start1 <= end2 && start2 <= end1;

    if (overlaps) {
      overlapCount++;
    }
  }

  return overlapCount;
}

try {
  const puzzleInput = fs.readFileSync("input-4.txt", "utf-8");
  const resultPart2 = countAnyOverlaps(puzzleInput);
  console.log(`Part 2 - overlapping pairs: ${resultPart2}`);
} catch (err) {
  console.error("Error: ", err.message);
}
