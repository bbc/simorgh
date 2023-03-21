import { WHITE as WHITE_NORMAL } from '#app/components/ThemeProvider/palette';
import DARK_PALETTE, {
  WHITE as WHITE_INVERTED,
} from '#app/components/ThemeProvider/paletteInverted';
import { Theme, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import React, {
  createContext,
  Dispatch,
  FC,
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

export const withDarkTheme = (Component: FC) => {
  const DarkThemePage = (props: JSX.IntrinsicAttributes) => {
    const { darkMode } = useContext(ThemeContextPOC);
    // The Nested ThemeProvider here takes the theme of it's ancestor ThemeProvider as input
    // for the applyDarkPalette function above, as recommended in emotion docs:
    // https://emotion.sh/docs/theming#themeprovider-reactcomponenttype
    return (
      <ThemeProvider theme={darkMode ? applyDarkPalette : theme => theme}>
        <Component {...props} />
      </ThemeProvider>
    );
  };

  return DarkThemePage;
};

export const ThemeWrapper = (Component: FC) => {
  const DarkThemeComponent = withDarkTheme(Component);

  const DarkThemeWrapper = (props: JSX.IntrinsicAttributes) => (
    <ThemeComponent>
      <DarkThemeComponent {...props} />
    </ThemeComponent>
  );

  return DarkThemeWrapper;
};
