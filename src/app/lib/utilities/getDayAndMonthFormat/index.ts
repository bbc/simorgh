import moment from 'moment-timezone';

// Derives a "day and month" format (no year) from the locale's own full-date
// (LL) format, so locale-specific conventions - such as Pidgin's ordinal day
// suffix ("Do MMMM YYYY") - are preserved when the year is omitted.
const getDayAndMonthFormat = (locale: string): string => {
  const longDateFormatLL = moment.localeData(locale).longDateFormat('LL');
  const dayToken = longDateFormatLL.includes('Do') ? 'Do' : 'D';

  return `${dayToken} MMMM`;
};

export default getDayAndMonthFormat;
