import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { yoruba as brandSVG } from '@bbc/psammead-assets/svgs';
import { latin } from '@bbc/gel-foundations/scripts';
import 'moment/locale/yo';
// Timezone value provided at build time
const timezone = Moment_Timezone_Africa_Lagos; //eslint-disable-line

const yoruba = {
  brandName: 'BBC News Yorùbá',
  locale: 'yo',
  service: 'yoruba',
  serviceName: 'Yoruba',
  themeColor: `${C_POSTBOX}`,
  brandSVG,
  latin,
  moment: {
    timezone,
    locale: 'yo',
  },
};

export default yoruba;
