import { createContext, ReactNode } from 'react';
import { BrandSVG } from '../../models/types/theming';

export const ThemeContext = createContext<Theme | undefined>(undefined);

type Theme = {
  brandSVG: BrandSVG;
};

export const ThemeProvider = (theme: Theme) => {
  return ({ children }: { children: ReactNode }) => (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
