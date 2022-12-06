const fs = require("fs-extra");
const readline = require("readline");

const findValue = (line, numberOfChar) => {
  for (var i = 0; i < line.length;) {
    let isPacketMarker = true;
    const substringToValidate = line.substring(i, i + numberOfChar).split("");
    for (var j = 0; j < substringToValidate.length - 1; j++) {
      for (var k = j + 1; k < substringToValidate.length; k++) {
        if (substringToValidate[k] === substringToValidate[j]) {
          isPacketMarker = false;
          i += (j + 1);
          break;
        }
      }

      if (!isPacketMarker) {
        break;
      }
    }
    
    if (isPacketMarker) {
      return i + numberOfChar;
    }
  }
};

async function daySixQuestionOne() {
  const fileStream = fs.createReadStream('./daySix/daySix.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let startOfPacketMarker = 0;

  for await (const line of rl) {
    startOfPacketMarker = findValue(line, 4);
  }

  console.log(startOfPacketMarker);
}

async function daySixQuestionTwo() {
  const fileStream = fs.createReadStream('./daySix/daySix.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let startOfMessageMarker = 0;

  for await (const line of rl) {
    startOfMessageMarker = findValue(line, 14);
  }

  console.log(startOfMessageMarker);
}

daySixQuestionOne();
daySixQuestionTwo();