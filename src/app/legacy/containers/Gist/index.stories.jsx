import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import Gist from '.';
import blocks from './fixtures';
import withServicesDecorator from '#app/utilities/withServicesDecorator';

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
  decorators: [withServicesDecorator],
  parameters: { chromatic: { disable: true } },
};

export const AtAGlance = Component;
