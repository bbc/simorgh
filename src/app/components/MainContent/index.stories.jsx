import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import MainContent from './index';

const data = {
  blocks: [
    {
      type: 'headline',
      blockId: '1',
    },
    {
      type: 'test',
      blockId: '2',
    },
  ],
};

storiesOf('MainContent', module)
  .add('with just a headline', () => {
    const blocksOnlyHeadline = data.blocks.filter(
      ({ type }) => type === 'headline',
    );
    const dataOnlyHeadline = { blocks: blocksOnlyHeadline };

    return <MainContent data={dataOnlyHeadline} />;
  })
  .add('with a headline and other blocks', () => <MainContent data={data} />);
