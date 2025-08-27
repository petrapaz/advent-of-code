const fs = require('fs'); //load file system

try {
  const calorieInput = fs.readFileSync('input-1.txt', 'utf8');
  // const elfGroups = calorieInput.trim().split('\n\n'); //not working on reading the empty lines
  const elfGroups = calorieInput.trim().split(/\r?\n\r?\n/);  //Windows, Unix/Mac line-end

  const calorieTotals = elfGroups.map(group => {
    return group.split(/\r?\n/).reduce((sum, line) => {
      const calories = parseInt(line, 10);
      return isNaN(calories) ? sum : sum + calories;
    }, 0);
  });

  const maxCalories = Math.max(...calorieTotals);
  console.log(`The Elf with the most calories is carrying: ${maxCalories}`);

  const sortedTotals = [...calorieTotals];
  sortedTotals.sort((a, b) => b - a);
  const sumOfTopThree = sortedTotals.slice(0, 3).reduce((sum, current) => sum + current, 0);
  console.log(`The sum of calories for the top three Elves is: ${sumOfTopThree}`);

} catch (err) {
  console.error('File reading error:', err);
}