import moment from 'moment';
import 'moment/locale/ro';

moment.updateLocale('ro', {
  relativeTime: {
    future: 'peste %s',
    past: 'acum %s',
    s: 'câteva secunde',
    ss: '%d secunde',
    m: 'un minut',
    mm: '%d minute',
    h: 'o oră',
    hh: '%d ore',
    d: 'o zi',
    dd: '%d zile',
    M: 'o lună',
    MM: '%d luni',
    y: 'un an',
    yy: '%d ani',
  },
});
