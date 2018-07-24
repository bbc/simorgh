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
  {
    blockId: '4',
    type: 'image',
    model: {
      blocks: [
        {
          blockId: 'd876cbe3-70fd-9884-c559-294eaa07ed24',
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
          blockId: 'f4bc507f-bffa-aa50-56f2-a57358b326ea',
          type: 'altText',
          model: {
            blocks: [
              {
                blockId: '8ee8f2e0-d7c3-fe4c-a64d-30a31877c047',
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      blockId: '99a67a9f-4bd5-2ed3-eece-e11486453a4b',
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
          blockId: 'aadb230d-284a-99e4-6407-3f0502f43a09',
          type: 'caption',
          model: {
            blocks: [
              {
                blockId: 'f142c008-a3e3-f823-3fdc-54511a959171',
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      blockId: '688cc097-1b1f-8734-fe13-dfbe7297093c',
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
  .add('with just a image', () => {
    const blocksOnlyImage = blocks.filter(({ type }) => type === 'image');

    return <MainContentContainer blocks={blocksOnlyImage} />;
  })
  .add('with a headline and other blocks', () => (
    <MainContentContainer blocks={blocks} />
  ));
