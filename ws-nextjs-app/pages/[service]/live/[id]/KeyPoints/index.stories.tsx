import React from 'react';

import KeyPoints from '.';
import { KeyPointsContent } from './types';
import { singleKeyPoint, multipleKeyPoints } from './fixture';
import metadata from './metadata.json';

const singleKeyPointBlocks = singleKeyPoint.model.blocks;
const multipleKeyPointsBlocks = multipleKeyPoints.model.blocks;

interface ComponentProps {
  keyPointsContent: KeyPointsContent[] | [];
}

const Component = ({ keyPointsContent }: ComponentProps) => {
  return <KeyPoints keyPointsContent={keyPointsContent} />;
};

export default {
  title: 'Components/Live Page Key Points',
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
};

export const SingleKeyPoint = () => (
  <Component keyPointsContent={singleKeyPointBlocks} />
);

export const MultipleKeyPoints = () => (
  <Component keyPointsContent={multipleKeyPointsBlocks} />
);
