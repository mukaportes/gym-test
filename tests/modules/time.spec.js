const faker = require('faker');
const { getTimeComponents, getTimeInSeconds } = require('../../src/modules/time');

describe('Time Module Tests', () => {
  describe('getTimeComponents()', () => {
    it('returns all time/number components from string', () => {
      const firstNum = faker.random.number({ min: 1, max: 24 });
      const secondNum = faker.random.number({ min: 1, max: 60 });
      const input = `${firstNum}-${secondNum}`;
      
      const timeComponents = getTimeComponents(input);
  
      expect(timeComponents[0]).toBe(String(firstNum));
      expect(timeComponents[1]).toBe(String(secondNum));
    });
    it('returns null when input string doesnt include numbers', () => {
      const input = faker.name.firstName();
      const timeComponents = getTimeComponents(input);

      expect(timeComponents).toBeNull();
    });
  });
  describe('getTimeInSeconds()', () => {
    it('returns first item of input array - hour - converted to seconds', () => {
      const input = [1, 0, 0, 0];
      const hourInSeconds = 3600;
      const timeInSeconds = getTimeInSeconds(input);

      expect(timeInSeconds).toEqual(hourInSeconds);
    });
    it('returns second item of input array - minute - converted to seconds', () => {
      const input = [0, 1, 0, 0];
      const minuteInSeconds = 60;
      const timeInSeconds = getTimeInSeconds(input);

      expect(timeInSeconds).toBe(minuteInSeconds);
    });
    it('returns third item of input array - second - as is', () => {
      const input = [0, 0, 1, 0];
      const timeInSeconds = getTimeInSeconds(input);

      expect(timeInSeconds).toBe(1);
    });
    it('returns fourth item of input array - milliseconds - converted to seconds', () => {
      const input = [0, 0, 0, 1];
      const millisecondsInSeconds = 0.001;
      const timeInSeconds = getTimeInSeconds(input);

      expect(timeInSeconds).toEqual(millisecondsInSeconds);
    });
  });
});