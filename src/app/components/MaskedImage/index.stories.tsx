import React from 'react';
import { StoryProps } from '#app/models/types/storybook';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import withServicesKnob from '#app/legacy/psammead/psammead-storybook-helpers/src/withServicesKnob';
import { withKnobs } from '@storybook/addon-knobs';
import ThemeProvider from '../ThemeProvider';
import MaskedImage from '.';
import metadata from './metadata.json';

interface Props extends StoryProps {
  imageUrl: string;
  imageUrlTemplate: string;
  imageWidth: number;
}

const Component = ({ service, variant }: Props) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <MaskedImage
          imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageWidth={660}
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/Masked Image',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: {
    chromatic: { disable: false },
    metadata,
  },
};

export const Example = Component;
