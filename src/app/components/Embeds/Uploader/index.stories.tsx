import React, { PropsWithChildren } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { withServicesKnob } from '../../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../../ThemeProvider';
import { Services } from '../../../models/types/global';

import Uploader from '.';
import { uploader, uploaderNonLatin, uploaderRTL } from './fixtures';
import metadata from './metadata.json';

interface Props {
  service: Services;
}

interface ComponentProps extends Props {
  blocks: object[];
}

const Component = ({ service, blocks }: PropsWithChildren<ComponentProps>) => (
  <ThemeProvider service={service}>
    <div
      style={{
        backgroundColor: '#f6f6f6',
        padding: '1rem',
      }}
    >
      <ServiceContextProvider service={service}>
        <ToggleContextProvider>
          <Uploader blocks={blocks} />
        </ToggleContextProvider>
      </ServiceContextProvider>
    </div>
  </ThemeProvider>
);

export default {
  title: 'Components/Embeds/Uploader',
  Component,
  parameters: {
    metadata,
    backgrounds: {
      default: 'Optimo',
    },
  },
  decorators: [withKnobs, withServicesKnob()],
};

export const Example = ({ service }: Props) => {
  return <Component blocks={uploader} service={service} />;
};

export const BurmeseExample = ({ service }: Props) => {
  return <Component blocks={uploaderNonLatin} service={service} />;
};

export const ArabicExample = ({ service }: Props) => {
  return <Component blocks={uploaderRTL} service={service} />;
};
