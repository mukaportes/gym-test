const { getTimeComponents, getTimeInSeconds } = require('../modules/time');

const Race = function (race) {
  this.race = race;

  this.isLapNumberGreater = function (pilots, lap) {
    return lap.lapNumber > pilots[lap.pilotId].lapNumber;
  }

  this.getLapFinishTime = function (lap) {
    const lapStartArray = getTimeComponents(lap.lapStart);
    const lapLengthArray = getTimeComponents(lap.lapTime);

    return getTimeInSeconds(lapStartArray) + getTimeInSeconds([0, ...lapLengthArray]);
  };

  this.isLapNumberSmaller = function (pilots, lap) {
    const currentLapTime = getTimeComponents(pilots[lap.pilotId].lapTime);
    const newLapTime = getTimeComponents(lap.lapTime);
    
    return getTimeInSeconds([0, ...newLapTime]) < getTimeInSeconds([0, ...currentLapTime]);
  }

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
    const { isLapNumberGreater, getLapFinishTime } = this;

    this.race.forEach(function (lap) {
      if (pilots[lap.pilotId] && isLapNumberGreater(pilots, lap)) {
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

    console.log('Result: ', this.sortPilotsAndFormat(pilots));
  }

  this.getPilotsBestLaps = function() {
    const pilots = {};
    const { isLapNumberSmaller } = this;

    this.race.forEach(function (lap) {
      if (pilots[lap.pilotId] && isLapNumberSmaller(pilots, lap)) {
        pilots[lap.pilotId].lapTime = lap.lapTime;
        pilots[lap.pilotId].lapNumber = lap.lapNumber;
      }

      if (!pilots[lap.pilotId]) {
        pilots[lap.pilotId] = {
          lapNumber: lap.lapNumber,
          pilotName: lap.pilotName,
          lapTime: lap.lapTime,
        };
      }
    });

    const formattedPilots = Object.keys(pilots).map(function(pilot) {
      return { pilotId: pilot, ...pilots[pilot] };
    });

    console.log('Pilots Best Laps: ', formattedPilots);
  }
}

module.exports = Race;