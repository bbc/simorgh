import React from 'react';
import { Global, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';

import * as palette from './palette';
import * as mq from './mediaQueries';
import * as spacings from './spacings';

import { BrandPalette, Typography } from '../../interfaces';

interface ServiceTheme {
  palette: BrandPalette;
  typography: Typography;
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
      <Global styles={({ typography }) => typography.fontFaces} />
      {children}
    </EmotionThemeProvider>
  );

  return ThemeProvider;
};

export default withThemeProvider;
