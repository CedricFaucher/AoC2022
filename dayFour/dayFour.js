const fs = require("fs-extra");
const readline = require("readline");

async function dayFourQuestionOne() {
  const fileStream = fs.createReadStream('./dayFour/dayFour.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let numberOfRangeContained = 0;

  for await (const line of rl) {
    const listOfPairs = line.split(",");
    const splittedPairs = listOfPairs.map(pair => pair.split("-"));
    
    const differenceFirstValue = parseInt(splittedPairs[1][0]) - parseInt(splittedPairs[0][0]);
    const differenceSecondValue = parseInt(splittedPairs[1][1]) - parseInt(splittedPairs[0][1]);

    if (differenceFirstValue === 0 || differenceSecondValue === 0 || (differenceFirstValue > 0 && differenceSecondValue < 0) || 
    (differenceFirstValue < 0 && differenceSecondValue > 0)) {
      numberOfRangeContained++;
    }
  }

  console.log(numberOfRangeContained);
}

async function dayFourQuestionTwo() {
  const fileStream = fs.createReadStream('./dayFour/dayFour.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let numberOfRangeContained = 0;

  for await (const line of rl) {
    const listOfPairs = line.split(",");
    const splittedPairs = listOfPairs.map(pair => pair.split("-"));

    const firstValue = parseInt(splittedPairs[0][0]);
    const secondValue = parseInt(splittedPairs[0][1]);
    const thirdValue = parseInt(splittedPairs[1][0]);
    const fourthValue = parseInt(splittedPairs[1][1]);

    if ((thirdValue >= firstValue && thirdValue <= secondValue) || (fourthValue >= firstValue && fourthValue <= secondValue) ||
    (firstValue >= thirdValue && firstValue <= fourthValue) || (secondValue >= thirdValue && secondValue <= fourthValue)) {
      numberOfRangeContained++;
    }
  }

  console.log(numberOfRangeContained);
}

dayFourQuestionOne();
dayFourQuestionTwo();