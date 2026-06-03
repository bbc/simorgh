const getLocalisedTime = (inputDate, inputTime) => {
  const [, day, monthName, year] = inputDate.split(' ');
  const [hour, minute] = inputTime.split(':').map(Number);

  const monthIndex =
    [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ].indexOf(monthName) + 1;

  // Build a London zoned datetime
  const ukTemporalDateTime = Temporal.ZonedDateTime.from({
    timeZone: 'Europe/London',
    year: Number(year),
    month: monthIndex,
    day: Number(day),
    hour,
    minute,
  });

  // Convert to a real JS Date (UTC internally)
  return new Date(ukTemporalDateTime.epochMilliseconds).toLocaleTimeString(
    undefined,
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  );
};

export default getLocalisedTime;
