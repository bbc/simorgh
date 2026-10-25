const moment = require('moment');
require('moment/locale/pt-br');

moment.updateLocale('pt-br', {
  months:
    'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split(
      '_'
    ),
  longDateFormat: {
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY [às] HH:mm',
    LLLL: 'dddd, D MMMM YYYY [às] HH:mm',
  },
  calendar: {
    sameDay: '[Hoje às] LT',
    nextDay: '[Amanhã às] LT',
    nextWeek: 'dddd [às] LT',
    lastDay: '[Ontem às] LT',
    lastWeek() {
      return this.day() === 0 || this.day() === 6
        ? '[Último] dddd [às] LT'
        : '[Última] dddd [às] LT';
    },
    sameElse: 'L',
  },
  relativeTime: {
    past: 'Há %s',
    m: '1 minuto',
    mm: '%d minutos',
    h: '1 hora',
    hh: '%d horas',
  },
});
