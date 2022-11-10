import moment from 'moment';
import 'moment/locale/mr';

moment.updateLocale('mr', {
  postformat: null,
  relativeTime: {
    past: '%sपूर्वी',
    m: '1 मिनिटा',
    mm: '%d मिनिटां',
    h: '1 तासा',
    hh: '%d तासां',
  },
});
