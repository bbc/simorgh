import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import MainContentContainer from './index';

describe('MainContent', () => {
  const blocks = [
    {
      type: 'headline',
      blockId: 'b-1',
      model: {
        blocks: [
          {
            type: 'text',
            blockId: '1-1',
            model: {
              blocks: [
                {
                  type: 'paragraph',
                  blockId: '1-1-1',
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
            blockId: '2-1',
            model: {
              text: 'This is some text content!',
            },
          },
        ],
      },
    },
    {
      type: 'test', // causes prop validation errors
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
            blockId: '4-1',
            type: 'rawImage',
            model: {
              width: 640,
              height: 420,
              locator:
                '/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg',
              originCode: null,
              copyrightHolder: 'BBC',
            },
          },
          {
            blockId: '4-2',
            type: 'altText',
            model: {
              blocks: [
                {
                  blockId: '4-2-1',
                  type: 'text',
                  model: {
                    blocks: [
                      {
                        type: 'paragraph',
                        blockId: '4-2-2',
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
            blockId: '4-2',
            type: 'caption',
            model: {
              blocks: [
                {
                  blockId: '4-2-1',
                  type: 'text',
                  model: {
                    blocks: [
                      {
                        type: 'paragraph',
                        blockId: '4-2-1-1',
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

  shouldMatchSnapshot(
    'should render correctly',
    <MainContentContainer blocks={blocks} />,
  );
});
