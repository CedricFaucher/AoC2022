const fs = require("fs-extra");
const readline = require("readline");

let currentPath = "/";
const fileSystem = {};
let isListing = false;

const doAction = actionLine => {
  if (actionLine[1] === "cd") {
    isListing = false;
    if (actionLine[2] === "/") {
      currentPath = "/";
    } else if (actionLine[2] === "..") {
      const lastIndexOfSlash = currentPath.lastIndexOf("/");
      currentPath = currentPath.substring(0, lastIndexOfSlash === 0 ? 1 : lastIndexOfSlash);
    } else {
      currentPath = currentPath.concat((currentPath === "/" ? "" : "/") + actionLine[2]);
    }
  } else if (actionLine[1] === "ls") {
    isListing = true;
  }
};

const updateFolders = (path, currentPathAcc) => {
  fileSystem[path] = fileSystem[path] ? fileSystem[path] + currentPathAcc : currentPathAcc;

  if (path === "/") {
    return;
  } else {
    const lastIndexOfSlash = path.lastIndexOf("/");
    updateFolders(path.substring(0, lastIndexOfSlash === 0 ? 1 : lastIndexOfSlash), currentPathAcc);
  }
};

const getSumOfSizeUnderNumber = number => {
  return Object.values(fileSystem).reduce((prev, curr) => {
    if (curr <= number) {
      return prev + curr;
    }
    return prev;
  }, 0);
};

const getValueClosestToDelete = () => {
  const maxSizeOfFileSystem = 70000000;
  const freeSpaceNeeded = 30000000;

  return Object.values(fileSystem).filter(value => value >= (freeSpaceNeeded - (maxSizeOfFileSystem - fileSystem["/"]))).sort((a, b) => a - b)[0];
};

async function daySevenQuestionOne() {
  const fileStream = fs.createReadStream('./daySeven/daySeven.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let currentPathAcc = 0;

  for await (const line of rl) {
    const splittedLine = line.split(" ");

    if (splittedLine[0] === "$") {
      if (currentPathAcc > 0) {
        updateFolders(currentPath, currentPathAcc);
        currentPathAcc = 0;
      }
      doAction(splittedLine);
    } else if (splittedLine[0] !== "dir") {
      currentPathAcc += parseInt(splittedLine[0]);
    }
  }

  if (currentPathAcc > 0) {
    updateFolders(currentPath, currentPathAcc);
  }

  console.log(getSumOfSizeUnderNumber(100000));
  daySevenQuestionTwo();
}

async function daySevenQuestionTwo() {
  console.log(getValueClosestToDelete());
}

daySevenQuestionOne();