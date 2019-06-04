const fs = require('fs');
const readline = require('readline');

const formatTimeInSeconds = function ([hours, minutes, seconds, milliseconds]) {
  return (Number(hours) * 3600)
    + (Number(minutes) * 60)
    + Number(seconds)
    + (Number(milliseconds) * 0.001);
}

const getPilotData = function (line) {
  const lapTimeCheck = formatTimeInSeconds(line[0].match(/(\d+)/g));
  const pilotId = line[1];
  const pilotName = line[3];
  const lapNumber = Number(line[4]);
  const lapTime = formatTimeInSeconds([0, ...line[5].match(/(\d+)/g)]);
  const lapAverageSpeed = Number(line[6].replace(',', '.'));

  return {
    lapTimeCheck, pilotId, pilotName, lapNumber, lapTime, lapAverageSpeed,
  };
}

const getFormattedRaceLogs = async function () {
  let isFirstLine = true;
  const lapsArray = [];

  const readlineInterface = readline.createInterface({
    input: fs.createReadStream('input/logs.txt'),
  });

  readlineInterface.on('line', function (line) {
    if (!isFirstLine) {
      const regex = /(\S+)/g;
      const formattedLine = line.match(regex);

      lapsArray.push(getPilotData(formattedLine));
    } else {
      isFirstLine = false;
    }
  });

  readlineInterface.on('close', function () {
    console.log('lapsArray', lapsArray);
  });
}

getFormattedRaceLogs();