const fs = require("fs-extra");
const readline = require("readline");

async function dayTenQuestionOne() {
  const fileStream = fs.createReadStream('./dayTen/dayTen.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let cycle = 0;
  let x = 1;
  let sumOfSignalStrength = 0;

  const oneCycleAction = () => {
    cycle++;
    if ((cycle + 20) % 40 === 0) {
      sumOfSignalStrength += (cycle * x);
    }
  };

  for await (const line of rl) {
    const commands = line.split(" ");

    if (commands[0] === "noop") {
      oneCycleAction();
    } else {
      oneCycleAction();
      oneCycleAction();
      x += parseInt(commands[1]);
    }

    if (cycle >= 220) {
      break;
    }
  }

  console.log(sumOfSignalStrength);
}

async function dayTenQuestionTwo() {
  const fileStream = fs.createReadStream('./dayTen/dayTen.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let cycle = 0;
  let x = 1;
  let crtImage = [];

  const oneCycleAction = () => {
    const positionInCrt = cycle % 40;

    if (positionInCrt === 0) {
      crtImage.push([]);
    }

    if (x >= positionInCrt - 1 && x <= positionInCrt + 1) {
      crtImage[crtImage.length - 1].push("#");
    } else {
      crtImage[crtImage.length - 1].push(".");
    }

    cycle++;
  };

  for await (const line of rl) {
    const commands = line.split(" ");

    if (commands[0] === "noop") {
      oneCycleAction();
    } else {
      oneCycleAction();
      oneCycleAction();
      x += parseInt(commands[1]);
    }

    if (cycle >= 240) {
      break;
    }
  }
  
  crtImage.forEach(line => console.log(line.join("")));
}

dayTenQuestionOne();
dayTenQuestionTwo();