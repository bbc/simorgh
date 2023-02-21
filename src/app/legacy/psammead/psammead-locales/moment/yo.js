const moment = require('moment');
require('moment/locale/yo');

moment.updateLocale('yo', {
  relativeTime: {
    // these keys have been overridden with our translations
    // some other keys have been left as set upstream
    // see https://github.com/moment/moment/blob/develop/src/locale/yo.js
    past: '%s sẹ́yìn',
    s: 'ìṣẹ́jú aayá die',
    m: 'ìṣẹ́jú kan',
    mm: 'ìṣẹ́jú %d',
    h: 'wákàtí kan',
    hh: 'wákàtí %d',
  },
});
