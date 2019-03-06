const relativeTime = receivedTimestamp => {
  const currentTime = Date.now();
  const timeDifferenceMilliseconds = currentTime - receivedTimestamp;
  const toMinuteDivisor = 1000 * 60;
  const timeDifferenceMinutes = parseInt(
    timeDifferenceMilliseconds / toMinuteDivisor,
    10,
  );

  if (timeDifferenceMinutes > 10 * 60 || timeDifferenceMilliseconds < 0) {
    return '';
  }

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
