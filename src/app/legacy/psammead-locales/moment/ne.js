const moment = require('moment');
require('moment/locale/ne');

moment.updateLocale('ne', {
  months:
    'जनवरी_फेब्रुवरी_मार्च_एप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split(
      '_'
    ),
  relativeTime: {
    past: '%s पहिले',
    m: '१ मिनेट',
    mm: '%d मिनेट',
    h: '१ घण्टा',
    hh: '%d घण्टा',
  },
});
