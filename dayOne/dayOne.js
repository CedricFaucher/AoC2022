const fs = require("fs-extra");
const readline = require("readline");

async function dayOneQuestionOne() {
  const fileStream = fs.createReadStream('./dayOne/dayOne.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let maxCalories = 0;
  let currentCalories = 0;

  for await (const line of rl) {
    if (line === "") {
      if (maxCalories < currentCalories) maxCalories = currentCalories;
      currentCalories = 0;
    } else {
      currentCalories += parseInt(line);
    }
  }

  console.log(maxCalories);
}

async function dayOneQuestionTwo() {
  const fileStream = fs.createReadStream('./dayOne/dayOne.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let maxCaloriesFirst = 0;
  let maxCaloriesSecond = 0;
  let maxCaloriesThird = 0;
  let currentCalories = 0;

  for await (const line of rl) {
    if (line === "") {
      if (maxCaloriesFirst < currentCalories) {
        maxCaloriesThird = maxCaloriesSecond;
        maxCaloriesSecond = maxCaloriesFirst;
        maxCaloriesFirst = currentCalories;
        currentCalories = 0;
      } else if (maxCaloriesSecond < currentCalories) {
        maxCaloriesThird = maxCaloriesSecond;
        maxCaloriesSecond = currentCalories;
        currentCalories = 0;
      } else if (maxCaloriesThird < currentCalories) {
        maxCaloriesThird = currentCalories;
        currentCalories = 0;
      }
      currentCalories = 0;
    } else {
      currentCalories += parseInt(line);
    }
  }

  console.log(maxCaloriesFirst + maxCaloriesSecond + maxCaloriesThird);
}

dayOneQuestionOne();
dayOneQuestionTwo();