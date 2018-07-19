import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import MainContent from './index';

const blocks = [
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
  {
    type: 'test',
    blockId: '3',
    model: {
      blocks: [
        {
          model: {
            text: 'This is some test content!',
          },
        },
      ],
    },
  },
];

storiesOf('MainContent', module)
  .add('with just a headline', () => {
    const blocksOnlyHeadline = blocks.filter(({ type }) => type === 'headline');

    return <MainContent blocks={blocksOnlyHeadline} />;
  })
  .add('with a headline and other blocks', () => (
    <MainContent blocks={blocks} />
  ));
