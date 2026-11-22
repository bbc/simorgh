const moment = require('moment');
require('moment/locale/uz-latn');

moment.updateLocale('uz-latn', {
  relativeTime: {
    // these keys have been overridden with our translations
    // some other keys have been left as set upstream
    // see https://github.com/moment/moment/blob/develop/src/locale/uz-latn.js
    past: '%s avval',
    m: '1 daqiqa',
    mm: '%d daqiqalar',
    h: '1 soat',
    hh: '%d soatlar',
  },
});
