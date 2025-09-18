import React, { createContext, ReactNode } from 'react';
import { BrandSVG } from '../../models/types/theming';

const ThemeContext = createContext<Theme | undefined>(undefined);

type Theme = {
  brandSVG: BrandSVG;
};

export const ThemeProvider = (theme: Theme) => {
  const { brandSVG } = theme;
  return ({ children }: { children: ReactNode }) => (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ brandSVG }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
