const { getTimeComponents, getTimeInSeconds } = require('../modules/time');

const Race = function (race) {
  this.race = race;

  this.isLapBigger = function (pilots, lap) {
    return pilots[lap.pilotId].lapNumber < lap.lapNumber;
  }

  this.getLapFinishTime = function (lap) {
    const lapStartArray = getTimeComponents(lap.lapStart);
    const lapLengthArray = getTimeComponents(lap.lapTime);

    return getTimeInSeconds(lapStartArray) + getTimeInSeconds([0, ...lapLengthArray]);
  };

  this.sortPilotsAndFormat = function (pilots) {
    const sortedIds = Object.keys(pilots).sort((a, b) => {
      if (pilots[a].lapNumber > pilots[b].lapNumber) {
        return -1;
      }

      if (pilots[a].time > pilots[b].time) {
        return -1;
      }

      return 0;
    });

    return sortedIds.map((item, index) => {
      const startInSeconds = getTimeComponents(pilots[item].start);

      return {
        position: index + 1,
        pilotId: item,
        pilotName: pilots[item].pilotName,
        laps: pilots[item].lapNumber,
        raceTotal: Number(pilots[item].time) - getTimeInSeconds(startInSeconds),
      };
    });
  }

  this.getResult = function () {
    const pilots = {};
    const { isLapBigger, getLapFinishTime } = this;

    this.race.forEach(function (lap) {
      if (pilots[lap.pilotId] && isLapBigger(pilots, lap)) {
        pilots[lap.pilotId].time = getLapFinishTime(lap);
        pilots[lap.pilotId].lapNumber = lap.lapNumber;
      }

      if (!pilots[lap.pilotId]) {
        pilots[lap.pilotId] = {
          lapNumber: lap.lapNumber,
          pilotName: lap.pilotName,
          start: lap.lapStart,
          time: getLapFinishTime(lap),
        };
      }
    });

    console.log('Result', this.sortPilotsAndFormat(pilots));
  }
}

module.exports = Race;