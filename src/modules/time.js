const getTimeInSeconds = function ([hours, minutes, seconds, milliseconds]) {
  return (Number(hours) * 3600)
    + (Number(minutes) * 60)
    + Number(seconds)
    + (Number(milliseconds) * 0.001);
}

const getTimeComponents = (time) => time.match(/(\d+)/g);

module.exports = {
  getTimeComponents,
  getTimeInSeconds,
};