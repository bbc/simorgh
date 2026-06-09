import 'temporal-polyfill';

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

  const ukDateTime = Temporal.ZonedDateTime.from({
    timeZone: 'Europe/London',
    year: Number(year),
    month: monthIndex,
    day: Number(day),
    hour,
    minute,
  });

  const userLocalDateTime = ukDateTime
    .withTimeZone(Temporal.Now.timeZoneId())
    .toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      numberingSystem: 'latn',
    });

  return userLocalDateTime;
};

export default getLocalisedTime;
