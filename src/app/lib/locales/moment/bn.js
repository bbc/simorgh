const moment = require('moment');
require('moment/locale/bn');

moment.updateLocale('bn', {
  months:
    'জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_অগাস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split(
      '_'
    ),
});
