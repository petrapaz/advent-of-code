const fs = require("fs");

function readInput(filePath) {
    const lines = fs.readFileSync(filePath, "utf-8").split("\n");

    let stacks = [];
    let moves = [];
    let parsingStacks = true;

    for (let line of lines) {
        if (line.trim() === "") {
            parsingStacks = false;
            continue;
        }

        if (parsingStacks) {
            let stackRow = [];
            for (let i = 1; i < line.length; i += 4) {
                stackRow.push(line[i] !== " " ? line[i] : null);
            }
            stacks.push(stackRow);
        } else {
            let parts = line.split(" ");
            moves.push([parseInt(parts[1]), parseInt(parts[3]) - 1, parseInt(parts[5]) - 1]);
        }
    }

    //transport stacks, top of the stack is at the end of an array
    const numStacks = stacks[0].length;
    let realStacks = Array.from({ length: numStacks }, () => []);
    for (let row of stacks.reverse()) {
        row.forEach((crate, i) => {
            if (crate) realStacks[i].push(crate);
        });
    }

    return { stacks: realStacks, moves };
}

//function for moving stacks from ... to ...
function executeMoves(stacks, moves) {
    for (let [count, fromIdx, toIdx] of moves) {
        for (let i = 0; i < count; i++) {
            let crate = stacks[fromIdx].pop();
            stacks[toIdx].push(crate);
        }
    }
    return stacks;
}

//get top of crates
function getTopCrates(stacks) {
    return stacks.map(stack => stack[stack.length - 1]).join("");
}

//main
try {
    const { stacks, moves } = readInput("input-5.txt");
    executeMoves(stacks, moves);
    const result = getTopCrates(stacks);
    console.log("Top crates:", result);
} catch (error) {
    console.error("Error:", error.message);
}
