import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../../../../src/app/contexts/ServiceContext';
import { withServicesKnob } from '../../../../../../src/app/legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../../../../../../src/app/components/ThemeProvider';
import KeyPoints from '.';
import { StoryProps } from '../../../../../../src/app/models/types/storybook';
import { SummaryListWrapper } from './types';
import { singleKeyPoint, multipleKeyPoints } from './fixture';

const singleKeyPointBlocks = singleKeyPoint.model.blocks;
const multipleKeyPointsBlocks = multipleKeyPoints.model.blocks;

interface ComponentProps extends StoryProps {
  keyPointBlocks: SummaryListWrapper[] | [];
}

const Component = ({ service, variant, keyPointBlocks }: ComponentProps) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <KeyPoints keyPointBlocks={keyPointBlocks} />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/Live Page Key Points',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const SingleKeyPoint = ({ service, variant }: StoryProps) => (
  <Component
    keyPointBlocks={singleKeyPointBlocks}
    service={service}
    variant={variant}
  />
);

export const MultipleKeyPoints = ({ service, variant }: StoryProps) => (
  <Component
    keyPointBlocks={multipleKeyPointsBlocks}
    service={service}
    variant={variant}
  />
);
