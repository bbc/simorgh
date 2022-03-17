var moment = require('moment');

moment.defineLocale('pcm', {
  // eslint-disable-next-line prettier/prettier
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
    '_'
  ),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  // eslint-disable-next-line prettier/prettier
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
    '_'
  ),
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'Do MMMM YYYY',
    LLL: 'Do MMMM YYYY HH:mm',
    LLLL: 'Do MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'inside %s',
    past: '%s wey don pass',
    s: 'just some seconds',
    ss: '%d seconds',
    m: 'one minute',
    mm: '%d minutes',
    h: 'one hour',
    hh: '%d hours',
    d: 'one day',
    dd: '%d days',
    M: 'one month',
    MM: '%d months',
    y: 'one year',
    yy: '%d years',
  },
  dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
  /* eslint-disable */
  // Copied exactly from https://github.com/moment/moment/blob/develop/locale/en-gb.js#L50-L57
  ordinal: function (number) {
    var b = number % 10,
      output =
        ~~((number % 100) / 10) === 1
          ? 'th'
          : b === 1
          ? 'st'
          : b === 2
          ? 'nd'
          : b === 3
          ? 'rd'
          : 'th';
    return number + output;
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
});
