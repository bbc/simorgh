import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import MainContent from './index';

const data = {
  blocks: [
    {
      type: 'headline',
      blockId: '1',
      model: {
        blocks: [
          {
            model: {
              blocks: [
                {
                  model: {
                    text: 'This is a headline!',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      type: 'text',
      blockId: '2',
      model: {
        blocks: [
          {
            model: {
              text: 'This is some text content!',
            },
          },
        ],
      },
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



