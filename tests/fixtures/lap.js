const faker = require('faker');

const lapStart = faker.random.word();
const pilotId = faker.random.word();
const pilotName = faker.random.word();
const lapNumber = `${faker.random.number()}`;
const lapTime = faker.random.word();
const lapAverageSpeed = `${faker.random.number({ min: 10, max: 30 })},${faker.random.number({ min: 10, max: 50 })}`;

const newLap = [
  lapStart, pilotId, pilotName, lapNumber, lapTime, lapAverageSpeed,
];

module.exports = {
  newLap,
};
