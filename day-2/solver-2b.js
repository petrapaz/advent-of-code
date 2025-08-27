const fs = require('fs');

// New rules: X/Y/Z = loss/draw/win

const roundScores = {
    'A X': 3, // opponent stone (A), LOSS (X) -> my move: scissors (3+0=3)
    'A Y': 4, // opponent stone (A), DRAW (Y) -> my move: stone (1+3=4)
    'A Z': 8, // opponent stone (A), WIN (Z) -> my move: paper (2+6=8)

    'B X': 1, // opponent paper (B), LOSS (X) -> my move: stone (1+0=1)
    'B Y': 5, // opponent paper (B), DRAW (Y) -> my move: paper (2+3=5)
    'B Z': 9, // opponent paper (B), WIN (Z) -> my move: scissors (3+6=9)

    'C X': 2, // opponent scissors (C), LOSS (X) -> my move: paper (2+0=2)
    'C Y': 6, // opponent scissors (C), DRAW (Y) -> my move: scissors (3+3=6)
    'C Z': 7, // opponent scissors (C), WIN (Z) -> my move: stone (1+6=7)
};

try {
    const input = fs.readFileSync('input-2.txt', 'utf8');
    let totalScore = 0;

    const rounds = input.split(/\r?\n/); //lines array without \r \n

    for (const round of rounds) {
        if (round.trim().length === 0) { //.trim cleanes unnecessary space,\t,\n and puts it in temporary version //.length===0 checks for empty lines
            continue;
        }

        //get the round result from roundScores object
        const scoreForRound = roundScores[round.trim()]; //we need new .trim because we are checking the original version, not the copy (temporary) one
        
        if (scoreForRound !== undefined) {
            totalScore += scoreForRound;
        }
    }

    console.log("The result after summing all rounds outcomes by new rules is:", totalScore);

} catch (error) {
    console.error("Error:", error.message);
}