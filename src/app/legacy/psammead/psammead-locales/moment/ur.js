const moment = require('moment');
require('moment/locale/ur');

moment.updateLocale('ur', {
  months:
    'جنوری_فروری_مار چ_اپريل_مئ_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر'.split(
      '_'
    ),
});
