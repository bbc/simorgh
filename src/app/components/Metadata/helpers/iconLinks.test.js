import { shouldMatchSnapshot } from '../../../../testHelpers';
import { getIconLinks } from './iconLinks';

const iconSizes = {
  'apple-touch-icon': [
    '72x72',
    '96x96',
    '128x128',
    '144x144',
    '152x152',
    '192x192',
    '384x384',
    '512x512',
  ],
  icon: ['72x72', '96x96', '192x192'],
};

describe('getIconLinks', () => {
  const links = getIconLinks('news', iconSizes);
  shouldMatchSnapshot('should render icon meta tags correctly', links);
});
