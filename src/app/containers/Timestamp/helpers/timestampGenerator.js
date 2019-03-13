export default timeDifference => {
  const magnitudes = {
    hours: 60 * 60 * 1000,
    minutes: 60 * 1000,
    seconds: 1000,
    milliseconds: 1,
  };
  let timestamp = Date.now();
  const keyNames = Object.keys(timeDifference);

  keyNames.forEach(diff => {
    timestamp -= timeDifference[diff] * magnitudes[diff];
  });

  return timestamp;
};
