import React from 'react';
import HeaderContainer from '.';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

const Component = () => {
  return (
    <ToggleContextProvider
      toggles={{
        scriptLink: { enabled: true },
      }}
    >
      <ServiceContext.Provider
        value={{
          scriptLink: {
            text: 'Ћир',
            variant: 'cyr',
          },
          translations: { skipLinkText: 'text' },
        }}
      >
        <HeaderContainer />
      </ServiceContext.Provider>
    </ToggleContextProvider>
  );
};

export default {
  title: 'Containers/Header',
  Component,
  parameters: {
    chromatic: { disable: true },
  },
};

export const Header = Component;
