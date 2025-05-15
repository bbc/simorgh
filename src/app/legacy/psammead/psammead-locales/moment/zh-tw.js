const moment = require('moment');
require('moment/locale/zh-tw');

moment.updateLocale('zh-tw', {
  longDateFormat: {
    LL: 'YYYY年M月D日',
    LLL: 'YYYY年M月D日Ah時mm分',
  },
  relativeTime: {
    // these keys have been overridden with our translations
    // some other keys have been left as set upstream
    // see https://github.com/moment/moment/blob/develop/src/locale/zh-tw.js
    m: '1 分鐘',
    mm: '%d 分鐘',
    h: '1 小時',
    hh: '%d 小時',
  },
});
