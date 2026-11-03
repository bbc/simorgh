const moment = require('moment');
require('moment/locale/en-gb');

moment.updateLocale('en-gb', {
  relativeTime: {
    m: '1 minute',
    h: '1 hour',
  },
});
