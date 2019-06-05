const LapEntity = require('../../src/entities/lap');
const { newLap } = require('../fixtures/lap');

describe('Lap Entity Tests', () => {
  describe('get()', () => {
    it('returns object with new lap formatted', () => {
      const lap = new LapEntity(newLap).get();

      console.log(newLap)

      expect(lap).toEqual({
        lapStart: newLap[0],
        pilotId: newLap[1],
        pilotName: newLap[2],
        lapNumber: Number(newLap[3]),
        lapTime: newLap[4],
        lapAverageSpeed: Number(newLap[5].replace(',', '.')),
      });
    });
  });
});