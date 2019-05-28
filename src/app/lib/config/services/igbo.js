import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { igbo as brandSVG } from '@bbc/psammead-assets/svgs';
import { latin } from '@bbc/gel-foundations/scripts';
import 'moment/locale/yo';

const igbo = {
  brandName: 'BBC News Ìgbò',
  locale: 'ig',
  service: 'igbo',
  serviceName: 'Igbo',
  themeColor: `${C_POSTBOX}`,
  brandSVG,
  script: latin,
  moment: {
    locale: 'yo',
  },
};

export default igbo;
