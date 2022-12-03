const fs = require("fs-extra");
const readline = require("readline");

const getPriorityOfCharacter = character => {
  if (character.charCodeAt(0) >= 97) {
    return character.charCodeAt(0) - 96;
  } else {
    return character.charCodeAt(0) - 38;
  }
};

async function dayThreeQuestionOne() {
  const fileStream = fs.createReadStream('./dayThree/dayThree.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let sumOfPriorities = 0;

  for await (const line of rl) {
    const lengthOfString = line.length;
    const firstRucksack = line.slice(0, lengthOfString / 2);
    const secondRucksack = line.slice(lengthOfString / 2);

    const seenCharacters = {};

    for (var i = 0; i < firstRucksack.length; i++) {
      const evaluatedCharacter = firstRucksack.charAt(i);

      if (seenCharacters[evaluatedCharacter]) {
        continue;
      }

      if (secondRucksack.includes(evaluatedCharacter)) {
        sumOfPriorities += getPriorityOfCharacter(evaluatedCharacter);
      }

      seenCharacters[evaluatedCharacter] = "true";
    }
  }

  console.log(sumOfPriorities);
}

async function dayThreeQuestionTwo() {
  const fileStream = fs.createReadStream('./dayThree/dayThree.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let sumOfPriorities = 0;
  const linesToEvaluate = [];

  const evaluate = () => {
    // Would be more optimal to take the shortest line of the three
    const lineToEvaluate = linesToEvaluate[0];
    
    for (var i = 0; i < lineToEvaluate.length; i++) {
      const evaluatedCharacter = lineToEvaluate.charAt(i);

      if (linesToEvaluate[1].includes(evaluatedCharacter)) {
        if (linesToEvaluate[2].includes(evaluatedCharacter)) {
          sumOfPriorities += getPriorityOfCharacter(evaluatedCharacter);
          break;
        }
      }
    }

    linesToEvaluate.splice(0, 3);
  };

  for await (const line of rl) {
    linesToEvaluate.push(line);
    if (linesToEvaluate.length === 3) {
      evaluate();
    }
  }

  console.log(sumOfPriorities);
}

dayThreeQuestionOne();
dayThreeQuestionTwo();