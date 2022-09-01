import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';

import { palette } from './palette';
import * as mq from './mediaQueries';
import * as spacings from './spacings';

import { BrandPalette } from '../../interfaces';

interface ServiceTheme {
  palette: BrandPalette;
}

type Props = {
  children: React.ReactNode;
};

const withThemeProvider = (serviceTheme: ServiceTheme) => {
  const ThemeProvider: React.FC<Props> = ({ children }) => (
    <EmotionThemeProvider
      theme={mergeDeepLeft(serviceTheme, {
        palette,
        mq,
        spacings,
      })}
    >
      {children}
    </EmotionThemeProvider>
  );

  return ThemeProvider;
};

export default withThemeProvider;
