import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import MainContentContainer from './index';

const blocks = [
  {
    type: 'headline',
    blockId: '1',
    model: {
      blocks: [
        {
          type: 'text',
          blockId: 't-1',
          model: {
            blocks: [
              {
                type: 'paragraph',
                blockId: 'p-1',
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
    type: 'subheading',
    blockId: '1',
    model: {
      blocks: [
        {
          type: 'text',
          blockId: 't-1',
          model: {
            blocks: [
              {
                type: 'paragraph',
                blockId: 'p-1',
                model: {
                  text: 'This is a subheading!',
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
          type: 'paragraph',
          blockId: 'p-2',
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
  {
    blockId: '1',
    type: 'image',
    model: {
      blocks: [
        {
          blockId: '1-1',
          type: 'rawImage',
          model: {
            width: 640,
            height: 420,
            locator: '/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg',
            originCode: null,
            copyrightHolder: 'BBC',
          },
        },
        {
          blockId: '1-2',
          type: 'altText',
          model: {
            blocks: [
              {
                blockId: '1-2-1',
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      blockId: '1-2-2',
                      model: {
                        text: 'Pauline Clayton',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          blockId: '2',
          type: 'caption',
          model: {
            blocks: [
              {
                blockId: '2-1',
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      blockId: '2-1-1',
                      model: {
                        text:
                          'Former embroider Pauline Clayton described the gift as "lovely"',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
];

storiesOf('MainContent', module)
  .add('with just a headline', () => {
    const blocksOnlyHeadline = blocks.filter(({ type }) => type === 'headline');

    return <MainContentContainer blocks={blocksOnlyHeadline} />;
  })
  .add('with a headline and other blocks', () => (
    <MainContentContainer blocks={blocks} />
  ));
