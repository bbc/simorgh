import HeaderContainer from '.';
import { ToggleContextProvider } from '../../../contexts/ToggleContext';

const Component = () => (
  <ToggleContextProvider
    toggles={{
      scriptLink: {
        enabled: true,
      },
    }}
  >
    <HeaderContainer />
  </ToggleContextProvider>
);

export default {
  title: 'Containers/Header',
  Component,
  parameters: {
    chromatic: { disable: true },
  },
};

export const Header = Component;
