const relativeTime = receivedTimestamp => {
  const currentTime = Date.now();
  const timeDifferenceMilliseconds = currentTime - receivedTimestamp;
  const timeDifferenceMinutes = parseInt(
    timeDifferenceMilliseconds / (1000 * 60),
    10,
  );

  const isInFuture = timeDifferenceMilliseconds < 0;
  const isMoreThanTenHoursAgo = timeDifferenceMinutes > 10 * 60;

  if (isInFuture || isMoreThanTenHoursAgo) {
    return null;
  }

  let timeDiff;
  let unit;

  if (timeDifferenceMinutes >= 60) {
    timeDiff = parseInt(timeDifferenceMinutes / 60, 10);
    unit = timeDiff > 1 ? 'hours' : 'hour';
  } else {
    timeDiff = timeDifferenceMinutes <= 1 ? 1 : timeDifferenceMinutes;
    unit = timeDiff === 1 ? 'minute' : 'minutes';
  }

  return `${timeDiff} ${unit} ago`;
};

export default relativeTime;
