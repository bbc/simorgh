import { Theme } from '@emotion/react';

import * as colours from '../colours';
import * as spacings from '../spacings';
import * as mq from '../mediaQueries';
import * as themes from '../services';

type Service = 'mundo' | 'pidgin';

const getTheme = (service: Service): Theme => ({
  colours: {
    ...colours,
    ...themes[service].colours,
  },
  typography: themes[service].typography,
  spacings,
  mq,
});

export default getTheme;
