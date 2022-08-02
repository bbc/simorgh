import * as colours from '../colours';
import * as spacings from '../spacings';
import * as mq from '../mediaQueries';
import * as themes from '../services';

const getTheme = service => ({
  colours: {
    ...colours,
    ...themes[service].colours,
  },
  typography: themes[service].typography,
  spacings,
  mq,
});

export default getTheme;
