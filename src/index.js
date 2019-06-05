const getRaceLogs = require('./services/race-logs');
const Lap = require('./entities/lap');
const Race = require('./entities/race');

const run = async function() {
  const raceLaps = await getRaceLogs(Lap);
  const race = new Race(raceLaps)
  race.getResult();
  race.getPilotsBestLaps();
}

run()
  .then(() => console.log('Program stopped.'))
  .catch((error) => console.error('Program stopped with error: ', error));