const fs = require("fs-extra");
const readline = require("readline");

// TODO: Format it directly from text file
/*
 
[M] [H]         [N]                
[S] [W]         [F]     [W] [V]    
[J] [J]         [B]     [S] [B] [F]
[L] [F] [G]     [C]     [L] [N] [N]
[V] [Z] [D]     [P] [W] [G] [F] [Z]
[F] [D] [C] [S] [W] [M] [N] [H] [H]
[N] [N] [R] [B] [Z] [R] [T] [T] [M]
[R] [P] [W] [N] [M] [P] [R] [Q] [L]
 1   2   3   4   5   6   7   8   9 

 */

const initialStack = [
  ['M', 'S', 'J', 'L', 'V', 'F', 'N', 'R'],
  ['H', 'W', 'J', 'F', 'Z', 'D', 'N', 'P'],
  ['G', 'D', 'C', 'R', 'W'],
  ['S', 'B', 'N'],
  ['N', 'F', 'B', 'C', 'P', 'W', 'Z', 'M'],
  ['W', 'M', 'R', 'P'],
  ['W', 'S', 'L', 'G', 'N', 'T', 'R'],
  ['V', 'B', 'N', 'F', 'H', 'T', 'Q'],
  ['F', 'N', 'Z', 'H', 'M', 'L']
];

const initializeList = (line, listToFill) => {
  const wellFormattedList = [];

  if (line.charAt(0) === "[") {
    const lineToAdd = [];
    for (var i = 1; i < line.length; i += 4) {
      lineToAdd.push(line.charAt(i));
    }
    listToFill.push(lineToAdd);
  } else {
    const trimmedLine = line.trim();
    const splittedLine = trimmedLine.split("   ");
    
    if (splittedLine[0] !== "") {
      splittedLine.forEach(element => wellFormattedList.push([]));
      for (var i = listToFill.length - 1; i >= 0; i--) {
        listToFill[i].forEach((element, index) => {
          if (element !== " ") {
            wellFormattedList[index].unshift(element);
          }
        });
      }
    }
  }

  return wellFormattedList;
};

async function dayFiveQuestionOne() {
  const fileStream = fs.createReadStream('./dayFive/dayFive.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const l = [];
  let stackCopy = [];

  for await (const line of rl) {
    const lineType = line.split(" ");

    if (!!!line.charCodeAt(0)) {
      continue;
    }

    if (lineType[0] !== "move") {
      stackCopy = initializeList(line, l);
      continue;
    }

    const splittedLine = line.split(" ");

    for (var i = 0; i < parseInt(splittedLine[1]); i++) {
      const valueToMove = stackCopy[parseInt(splittedLine[3]) - 1].shift();
      stackCopy[parseInt(splittedLine[5]) - 1].unshift(valueToMove);
    }
  }

  let resultString = "";
  stackCopy.forEach(list => resultString += list[0]);

  console.log(resultString);
}

async function dayFiveQuestionTwo() {
  const fileStream = fs.createReadStream('./dayFive/dayFive.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const l = [];
  let stackCopy = [];

  for await (const line of rl) {
    const lineType = line.split(" ");

    if (!!!line.charCodeAt(0)) {
      continue;
    }

    if (lineType[0] !== "move") {
      stackCopy = initializeList(line, l);
      continue;
    }
    
    const splittedLine = line.split(" ");

    const listToMove = [];

    for (var i = 0; i < parseInt(splittedLine[1]); i++) {
      const valueToMove = stackCopy[parseInt(splittedLine[3]) - 1].shift();
      listToMove.push(valueToMove);
    }

    listToMove.reverse().forEach(value => stackCopy[parseInt(splittedLine[5]) - 1].unshift(value));
  }

  let resultString = "";
  stackCopy.forEach(list => resultString += list[0]);

  console.log(resultString);
}

dayFiveQuestionOne();
dayFiveQuestionTwo();