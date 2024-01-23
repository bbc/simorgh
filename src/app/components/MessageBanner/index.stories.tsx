import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../ThemeProvider';
import MessageBanner from '.';
import { StoryProps } from '../../models/types/storybook';

interface Props extends StoryProps {
  text?: string;
  longText?: string;
}

const Component = ({ service, variant, text = '', longText = '' }: Props) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <MessageBanner
          heading={text}
          description={longText}
          link={'https://www.bbc.co.uk/ws/languages'}
          linkText={text}
          image={
            'https://ichef.bbci.co.uk/ace/standard/raw/cpsprodpb/e329/live/0a700dd0-7cb3-11ee-a503-4588075e3427.png'
          }
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/MessageBanner',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const Example = Component;
