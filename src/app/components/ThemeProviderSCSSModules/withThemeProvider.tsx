import { createContext, ReactNode, FC, use } from 'react';
import { Helmet } from 'react-helmet';
import { RequestContext } from '../../contexts/RequestContext';
import {
  LIVE_TV_PAGE,
  MEDIA_ARTICLE_PAGE,
  TV_PAGE,
} from '../../routes/utils/pageTypes';
import { PageTypes } from '../../models/types/global';
import { BrandSVG } from '../../models/types/theming';

const isDarkUiPage = (pageType: PageTypes) =>
  ([MEDIA_ARTICLE_PAGE, TV_PAGE, LIVE_TV_PAGE] as PageTypes[]).includes(
    pageType,
  );

export const ThemeContext = createContext<Theme | undefined>(undefined);

type Theme = {
  brandSVG: BrandSVG;
};

type Props = {
  children: ReactNode;
};

const withThemeProvider = (theme: Theme) => {
  const ThemeProvider: FC<Props> = ({ children }) => {
    const { pageType } = use(RequestContext);
    const isDarkUi = isDarkUiPage(pageType);

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    return (
      <ThemeContext.Provider value={theme}>
        <Helmet htmlAttributes={{ 'data-is-dark-ui': isDarkUi.toString() }} />
        {children}
      </ThemeContext.Provider>
    );
  };
  return ThemeProvider;
};

export default withThemeProvider;
