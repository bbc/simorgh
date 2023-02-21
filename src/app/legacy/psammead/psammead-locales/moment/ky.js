const moment = require('moment');
require('moment/locale/ky');

moment.updateLocale('ky', {
  relativeTime: {
    past: '%s мурда',
    m: '1 мүнөт',
    mm: '%d мүнөт',
    h: '1 саат',
    hh: '%d саат',
  },
});
