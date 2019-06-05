const Lap = function ([
  lapStart, pilotId, pilotName, lapNumber, lapTime, lapAverageSpeed,
]) {
  this.lapStart = lapStart;
  this.pilotId = pilotId;
  this.pilotName = pilotName;
  this.lapNumber = lapNumber;
  this.lapTime = lapTime;
  this.lapAverageSpeed = lapAverageSpeed;

  this.get = function() {
    return {
      lapStart: this.lapStart,
      pilotId: this.pilotId,
      pilotName: this.pilotName,
      lapNumber: Number(this.lapNumber),
      lapTime: this.lapTime,
      lapAverageSpeed: Number(this.lapAverageSpeed.replace(',', '.')),
    };
  }
}

module.exports = Lap;