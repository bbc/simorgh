import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { igbo as brandSVG } from '@bbc/psammead-assets/svgs';
import { latin } from '@bbc/gel-foundations/scripts';
import 'moment/locale/en-gb';
// Timezone value provided at build time
const timezone = Moment_Timezone_Europe_London; //eslint-disable-line

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
    locale: 'en-gb',
  },
};

export default igbo;
