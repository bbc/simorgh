const moment = require('moment');

const months = 'حمل_ثور_جوزا_سرطان_اسد_سنبله_میزان_عقرب_قوس_جدی_دلو_حوت'.split(
  '_'
);

moment.updateLocale('fa', {
  months,
  monthsShort: months,
  relativeTime: {
    past: '%s وړاندې', // %s 'ago'
    m: '۱ دقیقه', // '1 minute'
    mm: '%d دقیقې', // %d 'minutes'
    h: '۱ ساعت', // '1 hour'
    hh: '%d ساعتونه', // %d 'hours'
  },
  longDateFormat: {
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
  },
});
