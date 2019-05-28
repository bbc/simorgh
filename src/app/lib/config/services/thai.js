import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { thai as brandSVG } from '@bbc/psammead-assets/svgs';
import { thai as thaiScript } from '@bbc/gel-foundations/scripts';
import 'moment/locale/th';

const thai = {
  brandName: 'BBC News บีบีซีไทย',
  locale: 'th',
  service: 'thai',
  serviceName: 'Thai',
  themeColor: `${C_POSTBOX}`,
  brandSVG,
  script: thaiScript,
  moment: {
    locale: 'th',
  },
};

export default thai;
