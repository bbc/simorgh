import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { igbo as brandSVG } from '@bbc/psammead-assets/svgs';
import { latin } from '@bbc/gel-foundations/scripts';
import 'moment/locale/yo';
// Timezone value provided at build time
const timezone = Moment_Timezone_Africa_Lagos; //eslint-disable-line

const igbo = {
  brandName: 'BBC News Ìgbò',
  locale: 'ig',
  service: 'igbo',
  serviceName: 'Igbo',
  themeColor: `${C_POSTBOX}`,
  brandSVG,
  script: latin,
  moment: {
    timezone,
    locale: 'yo',
  },
};

export default igbo;
