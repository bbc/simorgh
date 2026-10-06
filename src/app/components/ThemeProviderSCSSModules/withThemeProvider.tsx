import { createContext, ReactNode, FC, use } from 'react';
import { Helmet } from 'react-helmet';
import isDarkUiPage from '#app/lib/utilities/isDarkUIPage';
import { RequestContext } from '../../contexts/RequestContext';
import { BrandSVG } from '../../models/types/theming';

export const ThemeContext = createContext<Theme | undefined>(undefined);

type Theme = {
  brandSVG: BrandSVG;
};

type Props = {
  children: ReactNode;
};

const withThemeProvider = (theme: Theme) => {
  const ThemeProvider: FC<Props> = ({ children }) => {
    const { pageType, primaryMediaType } = use(RequestContext);
    const isDarkUi = isDarkUiPage({ pageType, primaryMediaType });

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
