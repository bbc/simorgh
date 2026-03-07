import { createContext, ReactNode, FC } from 'react';
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
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    return (
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
  };
  return ThemeProvider;
};

export default withThemeProvider;
