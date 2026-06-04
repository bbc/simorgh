import 'temporal-polyfill/global';

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

  console.log(inputDate, inputTime, 'original input');

  const ukDateTime = Temporal.ZonedDateTime.from({
    timeZone: 'Europe/London',
    year: Number(year),
    month: monthIndex,
    day: Number(day),
    hour,
    minute,
  });

  console.log(ukDateTime.toString(), 'temporal time');

  const userLocalDateTime = ukDateTime
    .withTimeZone(Temporal.Now.timeZoneId())
    .toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      numberingSystem: 'latn',
    });

  console.log(userLocalDateTime, 'user local time (only hours)');

  return userLocalDateTime;
};

export default getLocalisedTime;
