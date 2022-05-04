const moment = require('moment');
require('moment/locale/gu');

moment.updateLocale('gu', {
  months:
    'જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઓગસ્ટ_સપ્ટેમ્બર_ઑક્ટોબર_નવેમ્બર_ડિસેમ્બર'.split(
      '_'
    ),
  postformat: null,
});
