const fs = require("fs-extra");
const readline = require("readline");

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