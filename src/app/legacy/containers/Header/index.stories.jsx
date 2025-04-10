import React from 'react';
import HeaderContainer from '.';
import { ToggleContextProvider } from '../../../contexts/ToggleContext';
import { MemoryRouter } from 'react-router';

const Component = () => (
  <ToggleContextProvider
    toggles={{
      scriptLink: {
        enabled: true,
      },
    }}
  >
    <MemoryRouter>
      <HeaderContainer />
    </MemoryRouter>
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
