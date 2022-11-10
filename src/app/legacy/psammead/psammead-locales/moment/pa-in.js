import moment from 'moment';
import 'moment/locale/pa-in';

moment.updateLocale('pa-in', {
  postformat: null,
  relativeTime: {
    past: '%s ਪਹਿਲਾਂ',
  },
});
