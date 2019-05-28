import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { pidgin as brandSVG } from '@bbc/psammead-assets/svgs';
import { latin } from '@bbc/gel-foundations/scripts';
import 'moment/locale/en-gb';

const pidgin = {
  brandName: 'BBC News Pidgin',
  locale: 'pcm',
  service: 'pidgin',
  serviceName: 'Pidgin',
  themeColor: `${C_POSTBOX}`,
  brandSVG,
  script: latin,
  moment: {
    locale: 'en-gb',
  },
};

export default pidgin;
