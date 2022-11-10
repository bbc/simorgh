import moment from 'moment';
import 'moment/locale/en-gb';

moment.updateLocale('en-gb', {
  relativeTime: {
    m: '1 minute',
    h: '1 hour',
  },
});
