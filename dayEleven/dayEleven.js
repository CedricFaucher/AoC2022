const fs = require("fs-extra");
const readline = require("readline");

async function dayElevenQuestionOne() {
  const fileStream = fs.createReadStream('./dayEleven/dayEleven.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const monkeys = {};

  const initializeMonkeys = async () => {
    let currentMonkey = "";

    for await (const line of rl) {
      const cleanedString = line.replaceAll(",", "");
      const splittedString = cleanedString.split(":");

      if (splittedString[0].includes("Monkey")) {
        const key = splittedString[0].split(" ")[1];
        monkeys[key] = {};
        monkeys[key].inspected = 0;
        currentMonkey = key;
      } else if (splittedString[0].includes("Starting")) {
        monkeys[currentMonkey].items = splittedString[1].trim().split(" ");
      } else if (splittedString[0].includes("Operation")) {
        const operation = splittedString[1].trim().split(" ");
        monkeys[currentMonkey].operation = {};
        monkeys[currentMonkey].operation.operator = operation[3];
        monkeys[currentMonkey].operation.value = operation[4];
      } else if (splittedString[0].includes("Test")) {
        monkeys[currentMonkey].test = splittedString[1].trim().split(" ")[2];
      } else if (splittedString[0].includes("true")) {
        monkeys[currentMonkey].true = splittedString[1].trim().split(" ")[3];
      } else if (splittedString[0].includes("false")) {
        monkeys[currentMonkey].false = splittedString[1].trim().split(" ")[3];
      }
    }
  };

  const round = () => {
    for (const [key, values] of Object.entries(monkeys)) {
      const copyItems = [ ...values.items ];
      copyItems.forEach(item => {
        monkeys[key].inspected++;
        const intItem = parseInt(item);
        const newValue = values.operation.operator === "+" ? intItem + (values.operation.value === 'old' ? intItem : parseInt(values.operation.value)): intItem * (values.operation.value === 'old' ? intItem : parseInt(values.operation.value));
        const boredValue = Math.floor(newValue / 3);
        
        if (boredValue % values.test === 0) {
          monkeys[values.true].items.push(boredValue);
          monkeys[key].items.shift();
        } else {
          monkeys[values.false].items.push(boredValue);
          monkeys[key].items.shift();
        }
      });
    }
  };

  initializeMonkeys().then(res => {
    for (var i = 0; i < 20; i++) {
      round();
    }

    let biggestInspect = 0;
    let secondBiggestInspect = 0;

    for (const [key, values] of Object.entries(monkeys)) {
      if (values.inspected > biggestInspect) {
        secondBiggestInspect = biggestInspect;
        biggestInspect = values.inspected;
      } else if (values.inspected > secondBiggestInspect) {
        secondBiggestInspect = values.inspected;
      }
    }

    console.log(biggestInspect * secondBiggestInspect);
  });
}

async function dayElevenQuestionTwo() {
  const fileStream = fs.createReadStream('./dayEleven/dayEleven.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const monkeys = {};

  const initializeMonkeys = async () => {
    let currentMonkey = "";

    for await (const line of rl) {
      const cleanedString = line.replaceAll(",", "");
      const splittedString = cleanedString.split(":");

      if (splittedString[0].includes("Monkey")) {
        const key = splittedString[0].split(" ")[1];
        monkeys[key] = {};
        monkeys[key].inspected = 0;
        currentMonkey = key;
      } else if (splittedString[0].includes("Starting")) {
        const splittedValues = splittedString[1].trim().split(" ");
        if (splittedValues[0] !== '') {
          monkeys[currentMonkey].items = splittedValues;
        } else {
          monkeys[currentMonkey].items = [];
        }
        //monkeys[currentMonkey].items = splittedString[1].trim().split(" ");
      } else if (splittedString[0].includes("Operation")) {
        const operation = splittedString[1].trim().split(" ");
        monkeys[currentMonkey].operation = {};
        monkeys[currentMonkey].operation.operator = operation[3];
        monkeys[currentMonkey].operation.value = operation[4];
      } else if (splittedString[0].includes("Test")) {
        monkeys[currentMonkey].test = splittedString[1].trim().split(" ")[2];
      } else if (splittedString[0].includes("true")) {
        monkeys[currentMonkey].true = splittedString[1].trim().split(" ")[3];
      } else if (splittedString[0].includes("false")) {
        monkeys[currentMonkey].false = splittedString[1].trim().split(" ")[3];
      }
    }
  };

  const round = lcmOfTest => {
    for (const [key, values] of Object.entries(monkeys)) {
      const copyItems = [ ...values.items ];
      copyItems.forEach(item => {
        monkeys[key].inspected++;
        const intItem = parseInt(item);
        const newValue = values.operation.operator === "+" ? intItem + (values.operation.value === 'old' ? intItem : parseInt(values.operation.value)): intItem * (values.operation.value === 'old' ? intItem : parseInt(values.operation.value));
        const moddedValue = newValue % lcmOfTest;

        if (moddedValue % values.test === 0) {
          monkeys[values.true].items.push(moddedValue);
          monkeys[key].items.shift();
        } else {
          monkeys[values.false].items.push(moddedValue);
          monkeys[key].items.shift();
        }
      });
    }
  };

  initializeMonkeys().then(res => {
    const lcmOfTest = Object.entries(monkeys).reduce((prevMonkey, currMonkey) => prevMonkey * parseInt(currMonkey[1].test), 1);
    for (var i = 0; i < 10000; i++) {
      round(lcmOfTest);
    }

    let biggestInspect = 0;
    let secondBiggestInspect = 0;

    for (const [key, values] of Object.entries(monkeys)) {
      if (values.inspected > biggestInspect) {
        secondBiggestInspect = biggestInspect;
        biggestInspect = values.inspected;
      } else if (values.inspected > secondBiggestInspect) {
        secondBiggestInspect = values.inspected;
      }
    }

    console.log(biggestInspect * secondBiggestInspect);
  });
}

//dayElevenQuestionOne();
dayElevenQuestionTwo();