const moment = require('moment');
require('moment/locale/uk');

function processHoursFunction(prefix) {
  return function calendarHours() {
    const preposition = this.hours() === 11 ? 'об' : 'о';
    return `[${prefix} ${preposition}] LT`;
  };
}

function calendarNextWeek() {
  const preposition = this.hours() === 11 ? 'об' : 'о';
  return `[У] dddd [${preposition}] LT`;
}

function calendarLastWeek() {
  const label = [0, 3, 5, 6].includes(this.day()) ? 'Минулої' : 'Минулого';
  const preposition = this.hours() === 11 ? 'об' : 'о';
  return `[${label}] dddd [${preposition}] LT`;
}

moment.updateLocale('uk', {
  weekdays: 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split(
    '_'
  ),
  longDateFormat: {
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, HH:mm',
    LLLL: 'dddd, D MMMM YYYY, HH:mm',
  },
  week: {
    dow: 1,
    doy: 7,
  },
  calendar: {
    sameDay: processHoursFunction('Сьогодні'),
    nextDay: processHoursFunction('Завтра'),
    lastDay: processHoursFunction('Вчора'),
    nextWeek: calendarNextWeek,
    lastWeek: calendarLastWeek,
    sameElse: 'L',
  },
  relativeTime: {
    past: '%s тому',
    m: '1 хвилину',
    mm: '%d хвилин(и)',
    h: '1 година',
    hh: '%d годин(и)',
  },
});
