const fs = require('fs');
const readline = require('readline');

const getRaceLogs = async function (Lap) {
  let isFirstLine = true;
  const lapsArray = [];

  return new Promise(function(resolve, reject) {
    const readlineInterface = readline.createInterface({
      input: fs.createReadStream('input/logs.txt'),
    });
  
    readlineInterface.on('line', function (line) {
      if (!isFirstLine) {
        const onlyWordsNumbersRegex = /(\S+\w|\d)/g;
        const formattedLine = line.match(onlyWordsNumbersRegex);
        const newLap = new Lap(formattedLine).get();

        lapsArray.push(newLap);
      } else {
        isFirstLine = false;
      }
    });
  
    readlineInterface.on('close', function () {
      resolve(lapsArray);
    });
  })
}

module.exports = getRaceLogs;