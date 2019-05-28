import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { yoruba as brandSVG } from '@bbc/psammead-assets/svgs';
import { latin } from '@bbc/gel-foundations/scripts';
import 'moment/locale/yo';

const yoruba = {
  brandName: 'BBC News Yorùbá',
  locale: 'yo',
  service: 'yoruba',
  serviceName: 'Yoruba',
  themeColor: `${C_POSTBOX}`,
  brandSVG,
  latin,
  moment: {
    locale: 'yo',
  },
};

export default yoruba;
