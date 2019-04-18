const constructTimestamp = timeDiffMins => {
  let timeDiff;
  let unit;

  if (timeDiffMins >= 60) {
    timeDiff = parseInt(timeDiffMins / 60, 10);
    unit = timeDiff > 1 ? 'hours' : 'hour';
  } else {
    timeDiff = timeDiffMins <= 1 ? 1 : timeDiffMins;
    unit = timeDiff === 1 ? 'minute' : 'minutes';
  }

  return `${timeDiff} ${unit} ago`;
};

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
    console.log('fut', isInFuture);
    console.log('more', isMoreThanTenHoursAgo);
    return null;
  }

  return constructTimestamp(timeDifferenceMinutes);
};

export default relativeTime;
