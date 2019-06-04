const Race = function (race) {
  this.race = race;

  this.isLapBigger = function(drivers, lap) {
    return drivers[lap.pilotId].lapNumber > drivers[lap.pilotId].lapNumber;
  }

  this.getResult = function () {
    const drivers = {};
    const { isLapBigger } = this;

    this.race.forEach(function(lap) {
      if (drivers[lap.pilotId] && isLapBigger(drivers, lap)) {
        drivers[lap.pilotId] = (lap.lapTimeCheck + lap.lapTime);
      }

      if (!drivers[lap.pilotId]) {
        drivers[lap.pilotId] = (lap.lapTimeCheck + lap.lapTime);
      }
    });

    console.log('drivers', drivers);
  }
}

module.exports = Race;