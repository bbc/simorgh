import React, { use, useMemo } from 'react';
import { Global, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import useIsPWA from '#app/hooks/useIsPWA';
import focusIndicator from './focusIndicator';
import { RequestContext } from '../../contexts/RequestContext';
import { MEDIA_ARTICLE_PAGE, TV_PAGE } from '../../routes/utils/pageTypes';
import { BrandPalette, Typography, BrandSVG } from '../../models/types/theming';
import { PageTypes } from '../../models/types/global';
import getThemeConfig from './getThemeConfig';

const isDarkUiPage = (pageType: PageTypes) =>
  pageType === MEDIA_ARTICLE_PAGE || pageType === TV_PAGE;

type ServiceTheme = {
  palette: BrandPalette;
  typography: Typography;
  brandSVG: BrandSVG;
};

const useMergeTheme = (
  baseTheme: ServiceTheme,
  pwaTheme?: Partial<ServiceTheme>,
): ServiceTheme => {
  const isPWA = useIsPWA();

  return useMemo(() => {
    if (isPWA && pwaTheme) {
      return {
        ...baseTheme,
        typography: {
          ...baseTheme.typography,
          ...pwaTheme.typography,
        },
      };
    }
    return baseTheme;
  }, [isPWA, baseTheme, pwaTheme]);
};

type Props = {
  children: React.ReactNode;
};

const withThemeProvider = (
  baseTheme: ServiceTheme,
  pwaTheme?: Partial<ServiceTheme>,
) => {
  const ThemeProvider: React.FC<Props> = ({ children }) => {
    const { isAmp, isLite, pageType } = use(RequestContext);

    const brandTheme = useMergeTheme(baseTheme, pwaTheme);

    const theme = getThemeConfig({
      ...brandTheme,
      isDarkUi: isDarkUiPage(pageType),
      isLite,
    });

    return (
      <EmotionThemeProvider theme={theme}>
        {children}
        {isAmp && <Global styles={baseTheme.typography.fontFaces} />}
        <Global styles={focusIndicator} />
      </EmotionThemeProvider>
    );
  };

  return ThemeProvider;
};

export default withThemeProvider;
