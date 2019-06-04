const { getTimeComponents, getTimeInSeconds } = require('../modules/time');

const Lap = function ([
  lapTimeCheck, pilotId, pilotName, lapNumber, lapTime, lapAverageSpeed,
]) {
  this.lapTimeCheck = getTimeComponents(lapTimeCheck);
  this.pilotId = pilotId;
  this.pilotName = pilotName;
  this.lapNumber = lapNumber;
  this.lapTime = getTimeComponents(lapTime);
  this.lapAverageSpeed = lapAverageSpeed;

  this.get = function() {
    return {
      lapTimeCheck: getTimeInSeconds(this.lapTimeCheck),
      pilotId: this.pilotId,
      pilotName: this.pilotName,
      lapNumber: Number(this.lapNumber),
      lapTime: getTimeInSeconds([0, ...this.lapTime]),
      lapAverageSpeed: Number(this.lapAverageSpeed.replace('-', '.')),
    };
  }
}

module.exports = Lap;