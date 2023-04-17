import React, { PropsWithChildren } from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../ThemeProvider';
import { Services } from '../../models/types/global';

import Uploader from '.';
import { pidginUploaderEmbed } from './fixtures';

interface Props {
  service: Services;
}

interface ComponentProps extends Props {
  blocks: object[];
}

const Component = ({ service, blocks }: PropsWithChildren<ComponentProps>) => (
  <ThemeProvider service={service}>
    <ServiceContextProvider service={service}>
      <ToggleContextProvider>
        <Uploader blocks={blocks} />
      </ToggleContextProvider>
    </ServiceContextProvider>
  </ThemeProvider>
);

export default {
  title: 'New Components/Uploader Embed',
  Component,
  parameters: {
    backgrounds: {
      default: 'Optimo',
    },
  },
  decorators: [withKnobs, withServicesKnob()],
};

export const LeftToRight = ({ service }: Props) => {
  return <Component blocks={pidginUploaderEmbed} service={service} />;
};
