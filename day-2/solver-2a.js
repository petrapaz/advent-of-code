//module load for reading document
const fs = require('fs');

//game rules
const shapeScores = {
    'X': 1, 'Y': 2, 'Z': 3 //stone 1, paper 2, scissors 3 points
};
const outcomeScores = {
    'A Y': 6, 'B Z': 6, 'C X': 6,   //win = 6 points
    'A X': 3, 'B Y': 3, 'C Z': 3,   //draw = 3 points
    'A Z': 0, 'B X': 0, 'C Y': 0    //loss = 0 points
};

//main logic in try..catch block
try {
    const input = fs.readFileSync('input-2.txt', 'utf8');

    let totalScore = 0; //let variable for changing value
    
    //universal line 'breaking', trim new line -> get clean array
    //example: "A Y \r\n B X \r\n C Z" -> .split -> cut \r \n -> clean array: ["A Y", "B X", "C Z"]
    const rounds = input.split(/\r?\n/);

    //for loop - every element of array (round) goes into loop
    for (const round of rounds) {
        //.trim method to remove unnecessary voids from beginning and end of string (space, \t, \n)
        //.length check for empty lines between rounds (3 lines = 1 round -> empty line -> 3 rounds ...)
        if (round.trim().length === 0) {
            continue;
        }

        const [opponentMove, myMove] = round.split(' '); // round="A Y" -> .split -> opponentMove='A', myMove='Y'
        const shapeScore = shapeScores[myMove]; //get value for shape score
        const outcomeKey = `${opponentMove} ${myMove}`; //merge: 'A' 'Y' -> "A Y"
        const outcomeScore = outcomeScores[outcomeKey]; //get value for outcomeScore from outcomeScores: "A Y" = 6 (win)
        
        //check for undefined character
        if (shapeScore !== undefined && outcomeScore !== undefined) {
            totalScore += shapeScore + outcomeScore;
        }
    }

    console.log("The result after summing all rounds outcomes is:", totalScore);

} catch (error) {
    if (error.code === 'ENOENT') {
        console.error("Error: document 'input-2.txt' not found.");
    } else {
        console.error("Error:", error.message);
    }
}