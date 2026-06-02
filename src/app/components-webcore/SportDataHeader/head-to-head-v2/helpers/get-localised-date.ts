// Helper function to get parts of Date object needed to make the final UK date time
const getDateObjectParts = date => {
  const get = type => date.find(item => item.type === type).value;

  return new Date(
    Date.UTC(get('year'), get('month'), get('day'), get('hour'), get('minute')),
  );
};

const getLocalisedDate = (date: string, time: string) => {
  const [, day, month, year] = date.split(' ');
  const formattedDay = Number(day);
  const formattedYear = Number(year);
  const formattedMonth =
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
    ].indexOf(month) - 1;

  const [hour, minute] = time.split(':').map(Number);

  // Doesn't take into account DST, have to make the UK date into UTC first and then convert back
  const ukDateInUTC = new Date(
    Date.UTC(formattedYear, formattedMonth, formattedDay, hour, minute),
  );

  // Convert UTC UK time to actual en-GB timezone
  const formattedUkDateTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(ukDateInUTC);

  // Get actual UK time in Date object form with timezone
  const finalUkDateTime = getDateObjectParts(formattedUkDateTime);

  // Return time relative to browser time
  return finalUkDateTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default getLocalisedDate;
