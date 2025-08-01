
import React, { createContext, ReactNode } from 'react';
const ThemeContext = createContext<{ brandSVG: React.JSX.Element } | undefined>(undefined);

type Theme = {
    brandSVG: React.JSX.Element;
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