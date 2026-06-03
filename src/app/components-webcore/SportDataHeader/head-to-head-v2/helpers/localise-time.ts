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

  const ukDateTime = Temporal.ZonedDateTime.from({
    timeZone: 'Europe/London',
    year: Number(year),
    month: monthIndex,
    day: Number(day),
    hour,
    minute,
  }).withTimeZone(Temporal.Now.timeZoneId());

  const userLocalDateTime = ukDateTime.toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return userLocalDateTime;
};

export default getLocalisedTime;
