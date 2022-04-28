var moment = require('moment');
require('moment/locale/sw');

moment.updateLocale('sw', {
  months: 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Disemba'.split(
    '_'
  ),
  relativeTime: {
    past: '%s',
    s: function (number, withoutSuffix, key, isFuture) {
      return withoutSuffix === false && isFuture === false
        ? 'sekunde chache zilizopita'
        : 'hivi punde';
    },
    ss: function (number, withoutSuffix, key, isFuture) {
      return withoutSuffix === false && isFuture === false
        ? 'sekunde chache zilizopita'
        : 'hivi punde';
    },
    m: function (number, withoutSuffix, key, isFuture) {
      return withoutSuffix === false && isFuture === false
        ? 'Dakika 1 iliyopita'
        : 'Dakika 1';
    },
    mm: function (number, withoutSuffix, key, isFuture) {
      return withoutSuffix === false && isFuture === false
        ? 'Dakika ' + number + ' zilizopita'
        : 'Dakika ' + number;
    },
    h: function (number, withoutSuffix, key, isFuture) {
      return withoutSuffix === false && isFuture === false
        ? 'Saa 1 iliyopita'
        : 'Saa 1';
    },
    hh: function (number, withoutSuffix, key, isFuture) {
      return withoutSuffix === false && isFuture === false
        ? 'Saa ' + number + ' zilizopita'
        : 'Saa ' + number;
    },
  },
});
