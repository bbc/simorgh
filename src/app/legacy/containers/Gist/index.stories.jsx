import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import Gist from '.';
import blocks from './fixtures';
import ThemeProvider from '../../../components/ThemeProvider';
import { ThemeContext } from '@emotion/react';

// eslint-disable-next-line react/prop-types
const Component = ({ service, script, dir }) => {
  return (
    <ThemeProvider service={service}>
      <ToggleContextProvider
        toggles={{
          gist: {
            enabled: true,
          },
        }}
      >
        <ServiceContextProvider service={service} script={script} dir={dir}>
          <Gist blocks={blocks} />;
        </ServiceContextProvider>
      </ToggleContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'Containers/Gist',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const AtAGlance = Component;
