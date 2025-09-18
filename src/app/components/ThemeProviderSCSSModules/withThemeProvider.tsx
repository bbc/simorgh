import React, { createContext, ReactNode } from 'react';
const ThemeContext = createContext<Theme | undefined>(undefined);
import { BrandSVG } from '../../models/types/theming';

type Theme = {
  brandSVG: BrandSVG;
};

export const ThemeProvider = (theme: Theme) => {
  const { brandSVG } = theme;
  return ({ children }: { children: ReactNode }) => (
    <ThemeContext.Provider value={{ brandSVG }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
