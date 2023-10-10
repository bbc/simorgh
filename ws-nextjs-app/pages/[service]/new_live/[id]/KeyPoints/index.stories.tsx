import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../../../../src/app/contexts/ServiceContext';
import { withServicesKnob } from '../../../../../../src/app/legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../../../../../../src/app/components/ThemeProvider';
import KeyPoints from '.';
import { StoryProps } from '../../../../../../src/app/models/types/storybook';
import { SummaryListWrapper } from './types';
import { singleKeyPoint, multipleKeyPoints } from './fixture';
import metadata from './metadata.json';

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
  parameters: {
    metadata,
    design: [
      {
        name: 'Group 0',
        type: 'figma',
        url: 'https://www.figma.com/file/mxshZlXkCPPIh0oQJvRLpZ/Live-summary-box---handover?type=design&node-id=447-66995&mode=design&t=gSZo3mYpGwIJaUrz-0',
      },
      {
        name: 'Group 1',
        type: 'figma',
        url: 'https://www.figma.com/file/mxshZlXkCPPIh0oQJvRLpZ/Live-summary-box---handover?type=design&node-id=456-65248&mode=design&t=gSZo3mYpGwIJaUrz-0',
      },
      {
        name: 'Group 2',
        type: 'figma',
        url: 'https://www.figma.com/file/mxshZlXkCPPIh0oQJvRLpZ/Live-summary-box---handover?type=design&node-id=456-65272&mode=design&t=gSZo3mYpGwIJaUrz-0',
      },
      {
        name: 'Group 3',
        type: 'figma',
        url: 'https://www.figma.com/file/mxshZlXkCPPIh0oQJvRLpZ/Live-summary-box---handover?type=design&node-id=456-65320&mode=design&t=gSZo3mYpGwIJaUrz-0',
      },
      {
        name: 'Group 4',
        type: 'figma',
        url: 'https://www.figma.com/file/mxshZlXkCPPIh0oQJvRLpZ/Live-summary-box---handover?type=design&node-id=456-65364&mode=design&t=gSZo3mYpGwIJaUrz-0',
      },
    ],
  },
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
