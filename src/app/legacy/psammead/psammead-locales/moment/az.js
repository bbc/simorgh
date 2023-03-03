const dayjs = require('dayjs');
require('dayjs/locale/az');

const relativeTime = require('dayjs/plugin/relativeTime');
const objectSupport = require('dayjs/plugin/objectSupport');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const updateLocale = require('dayjs/plugin/updateLocale');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const devHelper = require('dayjs/plugin/devHelper');

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(objectSupport);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
dayjs.extend(devHelper);

dayjs.updateLocale('az', {
  months:
    'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avqust_Sentyabr_Oktyabr_Noyabr_Dekabr'.split(
      '_'
    ),
});
