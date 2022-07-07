const moment = require('moment');
require('moment/locale/az');

moment.updateLocale('az', {
  months:
    'Yanvar_Fevral_Mart_Aprel_May_İyun_İyul_Avqust_Sentyabr_Oktyabr_Noyabr_Dekabr'.split(
      '_'
    ),
});
