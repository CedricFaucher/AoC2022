const fs = require("fs-extra");
const readline = require("readline");

const mapOfTrees = [];

const initializeMapOfTrees = async () => {
  const fileStream = fs.createReadStream('./dayEight/dayEight.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    mapOfTrees.push(line.split(''));
  }
};

const getDistanceFromEvaluatedTree = (i, j, direction) => {
  let distance = 0;
  const evaluatedTree = mapOfTrees[i][j];

  switch (direction) {
    case "LEFT":
      for (var row = j - 1; row >= 0; row--) {
        distance++;

        if (mapOfTrees[i][row] >= evaluatedTree) {
          return distance;
        }
      }
      break;
    case "RIGHT":
      for (var row = j + 1; row < mapOfTrees[i].length; row++) {
        distance++;

        if (mapOfTrees[i][row] >= evaluatedTree) {
          return distance;
        }
      }
      break;
    case "UP":
      for (var column = i - 1; column >= 0; column--) {
        distance++;

        if (mapOfTrees[column][j] >= evaluatedTree) {
          return distance;
        }
      }
      break;
    case "DOWN":
      for (var column = i + 1; column < mapOfTrees.length; column++) {
        distance++;

        if (mapOfTrees[column][j] >= evaluatedTree) {
          return distance;
        }
      }
      break;
  }

  return distance;
};

function dayEightQuestionOne() {
  let numberOfVisibleTrees = ((mapOfTrees.length - 1) * 2) + ((mapOfTrees[0].length - 1) * 2);

  for (var i = 1; i < mapOfTrees.length - 1; i++) {
    for (var j = 1; j < mapOfTrees[i].length - 1; j++) {
      const evaluatedTree = mapOfTrees[i][j];
      let isVisible = true;

      for (var row = 0; row < j; row++) {
        if (mapOfTrees[i][row] >= evaluatedTree) {
          isVisible = false;
          break;
        }
      }

      if (isVisible) {
        numberOfVisibleTrees++;
        continue;
      }

      isVisible = true;

      for (var row = mapOfTrees[i].length - 1; row > j; row--) {
        if (mapOfTrees[i][row] >= evaluatedTree) {
          isVisible = false;
          break;
        }
      }

      if (isVisible) {
        numberOfVisibleTrees++;
        continue;
      }

      isVisible = true;

      for (var column = 0; column < i; column++) {
        if (mapOfTrees[column][j] >= evaluatedTree) {
          isVisible = false;
          break;
        }
      }

      if (isVisible) {
        numberOfVisibleTrees++;
        continue;
      }

      isVisible = true;

      for (var column = mapOfTrees.length - 1; column > i; column--) {
        if (mapOfTrees[column][j] >= evaluatedTree) {
          isVisible = false;
          break;
        }
      }

      if (isVisible) {
        numberOfVisibleTrees++;
        continue;
      }
    }
  }

  console.log(numberOfVisibleTrees);
}

function dayEightQuestionTwo() {
  let bestScenicScore = 0;

  for (var i = 1; i < mapOfTrees.length - 1; i++) {
    for (var j = 1; j < mapOfTrees[i].length - 1; j++) {
      const scenicScore = getDistanceFromEvaluatedTree(i, j, "LEFT") * getDistanceFromEvaluatedTree(i, j, "RIGHT") * getDistanceFromEvaluatedTree(i, j, "UP") * getDistanceFromEvaluatedTree(i, j, "DOWN");
      if (bestScenicScore < scenicScore) {
        bestScenicScore = scenicScore;
      }
    }
  }

  console.log(bestScenicScore);
}

initializeMapOfTrees().then(res => {
  dayEightQuestionOne();
  dayEightQuestionTwo();
});