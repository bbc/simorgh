import { WHITE, BLACK } from '#app/components/ThemeProvider/palette';
import DARK_PALETTE from '#app/components/ThemeProvider/paletteInverted';

import { keyframes, Theme, ThemeProvider } from '@emotion/react';
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

const bounce = keyframes`
  0%, 100% {
    border-image: linear-gradient(45deg, lime, yellow) 10;
    border-image-width: 7px;
  }

  25% {
    border-image: linear-gradient(45deg, cyan, lime) 10;
    border-image-width: 7px;
  }

  50% {
    border-image: linear-gradient(45deg, fuchsia, cyan) 10;
    border-image-width: 7px;
  }

  75% {
    border-image: linear-gradient(45deg, yellow, fuchsia) 10;
    border-image-width: 7px;
  }

`;

const Button = styled.button<ButtonType>`
  position: fixed;
  top: 10rem;
  left: 1rem;
  z-index: 1;
  background: ${props => (props.mode ? BLACK : WHITE)};
  color: ${props => (props.mode ? WHITE : BLACK)};
  font-size: 1.5rem;
  padding: 1rem;
  animation: ${bounce} 0.5s linear infinite;
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
    <>
      <Button
        mode={darkMode}
        type="button"
        onClick={() => setDarkMode(!darkMode)}
      >
        SWITCH TO {darkMode ? 'LIGHT' : 'DARK'}
      </Button>
    </>
  );
};

export const applyDarkPalette = (ancestorTheme: Theme): Theme => {
  const changes = {
    palette: {
      ...ancestorTheme.palette,
      ...DARK_PALETTE,
    },
    isDarkUi: true,
  };
  return { ...ancestorTheme, ...changes } as Theme;
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
