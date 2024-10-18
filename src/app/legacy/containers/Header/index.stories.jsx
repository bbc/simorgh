import React from 'react';
import HeaderContainer from '.';
import { ToggleContextProvider } from '../../../contexts/ToggleContext';
import { BrowserRouter } from 'react-router-dom';

const Component = () => (
  <ToggleContextProvider
    toggles={{
      scriptLink: {
        enabled: true,
      },
    }}
  >
    <BrowserRouter>
      <HeaderContainer />
    </BrowserRouter>
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
