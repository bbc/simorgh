import React from 'react';
import { StoryProps } from '#app/models/types/storybook';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import ThemeProvider from '../ThemeProvider';
import MaskedImage from '.';

interface Props extends StoryProps {
  imageUrl: string;
  imageUrlTemplate: string;
  imageWidth: number;
}

export default {
  title: 'New Components/Masked Image',
  Component: MaskedImage,
  parameters: {
    chromatic: { disable: true },
  },
};

const Component = ({
  service,
  variant,
  imageUrl,
  imageUrlTemplate,
  imageWidth,
}: Props) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <MaskedImage
          imageUrl={imageUrl}
          imageUrlTemplate={imageUrlTemplate}
          imageWidth={imageWidth}
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

const imageUrl =
  'https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg';
const imageWidth = 660;
const imageUrlTemplate =
  'https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg';

export const MaskedImageRTL = () => (
  <Component
    imageUrl={imageUrl}
    imageUrlTemplate={imageUrlTemplate}
    imageWidth={imageWidth}
    service="afaanoromoo"
    variant="default"
  />
);
export const MaskedImageLTR = () => (
  <Component
    imageUrl={imageUrl}
    imageUrlTemplate={imageUrlTemplate}
    imageWidth={imageWidth}
    service="persian"
    variant="default"
  />
);
