const fs = require('fs');
const path = require('path');

function calculatePriority(char) {
  const isUpperCase = char === char.toUpperCase();
  if (isUpperCase) {
    //charCodeAt - gives ASCII coder for character: A=65, a=97
    return char.charCodeAt(0) - 65 + 27; // uppercase letters (A-Z -> 27-52)
  } else {
    return char.charCodeAt(0) - 97 + 1; // lowercase letters (a-z -> 1-26)
  }
}

function solveProblem(data) {
  //.trim() to remove any potential empty lines at the end of the file
  //.split('\n') splits file into array of lines (each line = one rucksack)
  const rucksacks = data.trim().split('\n');
  let totalPrioritySum = 0;

  for (const rucksack of rucksacks) {
    if (rucksack.length === 0) continue; // Skip empty lines

    const midpoint = rucksack.length / 2;
    const compartment1 = rucksack.slice(0, midpoint);
    const compartment2 = rucksack.slice(midpoint);
    let commonItem = '';

    //Set (collection) from the first half, allows fast checks
    const compartment1Items = new Set(compartment1);

    for (const item of compartment2) {
      if (compartment1Items.has(item)) {
        commonItem = item;
        break; // When found -> stop searching
      }
    }

    //if common item exists -> calculate priority value and add it to total
    if (commonItem) {
      const priority = calculatePriority(commonItem);
      totalPrioritySum += priority;
    }
  }

  return totalPrioritySum;
}

try {
  const filePath = path.join(__dirname, 'input-3.txt');
  const inputData = fs.readFileSync(filePath, 'utf8');

  const result = solveProblem(inputData);
  console.log(`The sum of the priorities is: ${result}`);

} catch (error) {
  console.error('Error reading the file:', error.message);
}