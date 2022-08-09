import { Global, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';

import * as colours from './colours';
import * as mq from './mediaQueries';
import * as spacings from './spacings';

import { BrandColours, Typography } from '../../interfaces';

interface ServiceTheme {
  colours: BrandColours;
  typography: Typography;
}

type Props = {
  children: JSX.Element | JSX.Element[];
};

const withThemeProvider = (serviceTheme: ServiceTheme) => {
  const ThemeProvider: React.FC<Props> = ({ children }: Props) => (
    <EmotionThemeProvider
      theme={mergeDeepLeft(serviceTheme, {
        colours,
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
