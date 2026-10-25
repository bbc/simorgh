const moment = require('moment');
require('moment/locale/uz');

moment.updateLocale('uz', {
  relativeTime: {
    // these keys have been overridden with our translations
    // some other keys have been left as set upstream
    // see https://github.com/moment/moment/blob/develop/src/locale/uz.js
    past: '%s аввал',
    m: '1 дақиқа',
    mm: '%d дақиқалар',
    h: '1 cоат',
    hh: '%d соатлар',
  },
});
