const moment = require('moment');
require('moment/locale/si');

moment.updateLocale('si', {
  relativeTime: {
    past: '%s පෙර',
    m: 'මිනිත්තු %d',
    mm: 'මිනිත්තු %d',
    h: 'පැයකට',
    hh: 'පැය %d කට',
  },
});
