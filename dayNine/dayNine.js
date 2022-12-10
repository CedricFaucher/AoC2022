const fs = require("fs-extra");
const readline = require("readline");

const tailMoves = { "0,0": true };
const headPos = { "x": 0, "y": 0 };
const tailPos = { "x": 0, "y": 0 };
const numberTwoPos = [
  { "x": 0, "y": 0 },
  { "x": 0, "y": 0 },
  { "x": 0, "y": 0 },
  { "x": 0, "y": 0 },
  { "x": 0, "y": 0 },
  { "x": 0, "y": 0 },
  { "x": 0, "y": 0 },
  { "x": 0, "y": 0 },
  { "x": 0, "y": 0 },
  { "x": 0, "y": 0 }
];

const move = (check) => {
  if (check) {
    tailPos.x = headPos.x;
    tailPos.y = headPos.y;
    tailMoves[tailPos.x + "," + tailPos.y] = true;
  }
};

const setupMove = (command) => {
  for (var i = 0; i < command[1]; i++) {
    switch (command[0]) {
      case 'L':
        move(headPos.x - tailPos.x === -1);
        headPos.x--;
        break;
      case 'R':
        move(headPos.x - tailPos.x === 1);
        headPos.x++;
        break;
      case 'U':
        move(headPos.y - tailPos.y === 1);
        headPos.y++;
        break;
      case 'D':
        move(headPos.y - tailPos.y === -1);
        headPos.y--;
        break;
    }
  }
}

const followUpMove = (movedOneIndex, oneToMoveIndex) => {
  const xDelta = numberTwoPos[movedOneIndex].x - numberTwoPos[oneToMoveIndex].x;
  const yDelta = numberTwoPos[movedOneIndex].y - numberTwoPos[oneToMoveIndex].y;

  if (xDelta === 2) {
    numberTwoPos[oneToMoveIndex].x++;
    if (yDelta >= 1) {
      numberTwoPos[oneToMoveIndex].y++;
    } else if (yDelta <= -1) {
      numberTwoPos[oneToMoveIndex].y--;
    }
  } else if (xDelta === -2) {
    numberTwoPos[oneToMoveIndex].x--;
    if (yDelta >= 1) {
      numberTwoPos[oneToMoveIndex].y++;
    } else if (yDelta <= -1) {
      numberTwoPos[oneToMoveIndex].y--;
    }
  } else if (yDelta === 2) {
    numberTwoPos[oneToMoveIndex].y++;
    if (xDelta >= 1) {
      numberTwoPos[oneToMoveIndex].x++;
    } else if (xDelta <= -1) {
      numberTwoPos[oneToMoveIndex].x--;
    }
  } else if (yDelta === -2) {
    numberTwoPos[oneToMoveIndex].y--;
    if (xDelta >= 1) {
      numberTwoPos[oneToMoveIndex].x++;
    } else if (xDelta <= -1) {
      numberTwoPos[oneToMoveIndex].x--;
    }
  }
};

async function dayNineQuestionOne() {
  const fileStream = fs.createReadStream('./dayNine/dayNine.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    setupMove(line.split(" "), headPos, tailPos, tailMoves);
  }

  console.log(Object.keys(tailMoves).length);
}

async function dayNineQuestionTwo() {
  const fileStream = fs.createReadStream('./dayNine/dayNine.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const realMoves = { "0,0": true };

  for await (const line of rl) {
    const command = line.split(" ");
    
    for (var i = 0; i < command[1]; i++) {
      switch (command[0]) {
        case 'L':
          if (numberTwoPos[0].x - numberTwoPos[1].x === -1) {
            numberTwoPos[1].x = numberTwoPos[0].x;
            numberTwoPos[1].y = numberTwoPos[0].y;
          }
          numberTwoPos[0].x--;
          break;
        case 'R':
          if (numberTwoPos[0].x - numberTwoPos[1].x === 1) {
            numberTwoPos[1].x = numberTwoPos[0].x;
            numberTwoPos[1].y = numberTwoPos[0].y;
          }
          numberTwoPos[0].x++;
          break;
        case 'U':
          if (numberTwoPos[0].y - numberTwoPos[1].y === 1) {
            numberTwoPos[1].x = numberTwoPos[0].x;
            numberTwoPos[1].y = numberTwoPos[0].y;
          }
          numberTwoPos[0].y++;
          break;
        case 'D':
          if (numberTwoPos[0].y - numberTwoPos[1].y === -1) {
            numberTwoPos[1].x = numberTwoPos[0].x;
            numberTwoPos[1].y = numberTwoPos[0].y;
          }
          numberTwoPos[0].y--;
          break;
      }

      for (var j = 1; j < numberTwoPos.length - 1; j++) {
        followUpMove(j, j+1);
      }
      
      realMoves[numberTwoPos[9].x + "," + numberTwoPos[9].y] = true;
    }
  }
  
  console.log(Object.keys(realMoves).length);
}

dayNineQuestionOne();
dayNineQuestionTwo();