import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import Gist from '.';
import blocks from './fixtures';

// eslint-disable-next-line react/prop-types
const Component = () => {
  return (
    <ToggleContextProvider
      toggles={{
        gist: {
          enabled: true,
        },
      }}
    >
      <Gist blocks={blocks} />;
    </ToggleContextProvider>
  );
};

export default {
  title: 'Containers/Gist',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const AtAGlance = Component;
