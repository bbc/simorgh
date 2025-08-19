const moment = require('moment');

const months = 'حمل_ثور_جوزا_سرطان_اسد_سنبله_میزان_عقرب_قوس_جدی_دلو_حوت'.split(
  '_'
);

moment.updateLocale('fa', {
  months,
  monthsShort: months,
});
