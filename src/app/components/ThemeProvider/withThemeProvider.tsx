import React, { useContext, useMemo, PropsWithChildren } from 'react';
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

export type ServiceTheme = {
  palette: BrandPalette;
  typography: Typography;
  brandSVG: BrandSVG;
};

export const useMergeTheme = (
  baseTheme: ServiceTheme,
  pwaTheme?: Partial<ServiceTheme>,
): ServiceTheme => {
  const isPWA = useIsPWA();

  return useMemo(() => {
    if (isPWA && pwaTheme) {
      return {
        ...baseTheme,
        palette: {
          ...baseTheme.palette,
          ...pwaTheme.palette,
        },
        typography: {
          ...baseTheme.typography,
          ...pwaTheme.typography,
        },
        brandSVG: pwaTheme.brandSVG || baseTheme.brandSVG,
      };
    }
    return baseTheme;
  }, [isPWA, baseTheme, pwaTheme]);
};

const withThemeProvider = (
  baseTheme: ServiceTheme,
  pwaTheme?: Partial<ServiceTheme>,
) => {
  const ThemeProvider = ({ children }: PropsWithChildren) => {
    const { isAmp, isLite, pageType } = useContext(RequestContext);

    const brandTheme = useMergeTheme(baseTheme, pwaTheme);

    return (
      <EmotionThemeProvider
        theme={getThemeConfig({
          ...brandTheme,
          isDarkUi: isDarkUiPage(pageType),
          isLite,
        })}
      >
        {children}
        {isAmp && <Global styles={baseTheme.typography.fontFaces} />}
        <Global styles={focusIndicator} />
      </EmotionThemeProvider>
    );
  };

  return ThemeProvider;
};

export default withThemeProvider;
