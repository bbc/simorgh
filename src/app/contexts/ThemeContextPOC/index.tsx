import { WHITE as WHITE_NORMAL } from '#app/components/ThemeProvider/palette';
import DARK_PALETTE, {
  WHITE as WHITE_INVERTED,
} from '#app/components/ThemeProvider/paletteInverted';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type RequestContextProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

const Button = styled.button<ButtonType>`
  border: ${props => (props.mode ? WHITE_NORMAL : WHITE_INVERTED)} 0.3rem solid;
  background: ${props => (props.mode ? WHITE_INVERTED : WHITE_NORMAL)};
  color: ${props => (props.mode ? WHITE_NORMAL : WHITE_INVERTED)};
  font-size: 1.5rem;
  padding: 1rem;
`;

type ButtonType = {
  mode: boolean;
};

export const ThemeContextPOC = createContext({} as RequestContextProps);

export const ThemeComponent = ({ children }: PropsWithChildren) => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContextPOC.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContextPOC.Provider>
  );
};

export const ToggleButton = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContextPOC);
  return (
    <Button
      mode={darkMode}
      type="button"
      onClick={() => setDarkMode(!darkMode)}
    >
      SWITCH TO {darkMode ? 'LIGHT' : 'DARK'}
    </Button>
  );
};

export const applyDarkPalette = (ancestorTheme: Theme): Theme => {
  return { ...ancestorTheme, ...DARK_PALETTE } as Theme;
};
