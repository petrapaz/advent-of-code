const fs = require('fs');
const path = require('path');

//a-z -> 1-26, A-Z -> 27-52

function calculatePriority(char) {
  const isUpperCase = char === char.toUpperCase();
  if (isUpperCase) {
    // charCodeAt - ASCII: A=65, a=97
    return char.charCodeAt(0) - 65 + 27; // Big char
  } else {
    return char.charCodeAt(0) - 97 + 1; // small char
  }
}

function solvePartTwo(data) {
  const rucksacks = data.trim().split('\n');
  let totalPrioritySum = 0;

  //string goes for every 3 backpacks
  for (let i = 0; i < rucksacks.length; i += 3) {
    //if group is incomplete (f.e. end of the txt file)
    if (!rucksacks[i + 1] || !rucksacks[i + 2]) continue;

    const elf1 = rucksacks[i];
    const elf2 = rucksacks[i + 1];
    const elf3 = rucksacks[i + 2];
    
    let badge = '';

    const elf1Items = new Set(elf1); //elf1 set

      for (const item of elf1Items) {
      //check if there is the same item at elf1, elf2, elf3
      if (elf2.includes(item) && elf3.includes(item)) {
        badge = item;
        break; //badge found -> break
      }
    }
    
    //if there is a badge -> add it to total sum
    if (badge) {
      totalPrioritySum += calculatePriority(badge);
    }
  }

  return totalPrioritySum;
}

try {
  const filePath = path.join(__dirname, 'input-3.txt');
  const inputData = fs.readFileSync(filePath, 'utf8');
  
  //function for 3b
  const result = solvePartTwo(inputData);
  console.log(`The sum of the badge priorities is: ${result}`);

} catch (error) {
  console.error('Error reading the file:', error.message);
}