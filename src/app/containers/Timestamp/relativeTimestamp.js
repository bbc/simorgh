const relativeTime = receivedTimestamp => {
  const currentTime = Date.now();
  const timeDifferenceMinutes = parseInt(
    (currentTime - receivedTimestamp) / 1000 / 60,
    10,
  );

  let timeDiff;
  let unit;

  if (timeDifferenceMinutes >= 60) {
    timeDiff = timeDifferenceMinutes / 60;
    unit = timeDiff > 1 ? 'hours' : 'hour';
  } else if (timeDifferenceMinutes <= 1) {
    timeDiff = 1;
    unit = 'minute';
  } else {
    timeDiff = timeDifferenceMinutes;
    unit = 'minutes';
  }

  return `${timeDiff} ${unit} ago`;
};

export default relativeTime;
