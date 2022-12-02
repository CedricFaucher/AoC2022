const fs = require("fs-extra");
const readline = require("readline");

async function dayTwoQuestionOne() {
  const fileStream = fs.createReadStream('./dayTwo/dayTwo.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const moveValues = {
    X: 1,
    Y: 2,
    Z: 3,
    A: 1,
    B: 2,
    C: 3
  };
  
  const getResultOfMatchup = (myMove, opponentMove) => {
    if (moveValues[myMove] === moveValues[opponentMove]) {
      return 3;
    }
  
    switch (myMove) {
      case "X" :
        return opponentMove === "B" ? 0 : 6;
      case "Y" :
        return opponentMove === "C" ? 0 : 6;
      case "Z" :
        return opponentMove === "A" ? 0 : 6;
    }
  };

  let totalScore = 0;

  for await (const line of rl) {
    const moves = line.split(" ");
    totalScore += moveValues[moves[1]] + getResultOfMatchup(moves[1], moves[0]);
  }

  console.log(totalScore);
}

async function dayTwoQuestionTwo() {
  const fileStream = fs.createReadStream('./dayTwo/dayTwo.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const moveValues = {
    X: 0,
    Y: 3,
    Z: 6,
    A: 1,
    B: 2,
    C: 3
  };
  
  const getResultOfMatchup = (myMove, opponentMove) => {
    if (moveValues[myMove] === 3) {
      return moveValues[opponentMove];
    }
  
    switch (opponentMove) {
      case "A" :
        return myMove === "X" ? moveValues.C : moveValues.B;
      case "B" :
        return myMove === "X" ? moveValues.A : moveValues.C;
      case "C" :
        return myMove === "X" ? moveValues.B : moveValues.A;
    }
  };

  let totalScore = 0;

  for await (const line of rl) {
    const moves = line.split(" ");
    totalScore += moveValues[moves[1]] + getResultOfMatchup(moves[1], moves[0]);
  }

  console.log(totalScore);
}

dayTwoQuestionOne();
dayTwoQuestionTwo();