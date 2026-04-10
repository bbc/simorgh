import type { ReactNode, FC } from 'react';
import { use, useMemo } from 'react';
import { Global, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import useIsPWA from '#app/hooks/useIsPWA';
import { ServiceTheme } from '#app/models/types/theming';
import focusIndicator from './focusIndicator';
import { RequestContext } from '../../contexts/RequestContext';
import {
  LIVE_TV_PAGE,
  MEDIA_ARTICLE_PAGE,
  TV_PAGE,
} from '../../routes/utils/pageTypes';
import { PageTypes } from '../../models/types/global';
import getThemeConfig from './getThemeConfig';
import mergeThemeWithPWATypography from './themes/mergeThemeWithPWATypography';

const isDarkUiPage = (pageType: PageTypes) =>
  ([MEDIA_ARTICLE_PAGE, TV_PAGE, LIVE_TV_PAGE] as PageTypes[]).includes(
    pageType,
  );

const useMergeTheme = (
  baseTheme: ServiceTheme,
  pwaTheme?: Partial<ServiceTheme>,
): ServiceTheme => {
  const isPWA = useIsPWA();

  return useMemo(() => {
    if (isPWA && pwaTheme) {
      return mergeThemeWithPWATypography({ baseTheme, pwaTheme });
    }
    return baseTheme;
  }, [isPWA, baseTheme, pwaTheme]);
};

type Props = {
  children: ReactNode;
};

const withThemeProvider = (
  baseTheme: ServiceTheme,
  pwaTheme?: Partial<ServiceTheme>,
) => {
  const ThemeProvider: FC<Props> = ({ children }) => {
    const { isAmp, isLite, pageType } = use(RequestContext);

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
