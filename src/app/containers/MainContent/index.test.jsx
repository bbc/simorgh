import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import MainContentContainer from './index';
import { blockContainingText } from '../../models/blocks';

describe('MainContent', () => {
  const blocks = [
    blockContainingText('headline', 'This is a headline!'),
    blockContainingText('subheading', 'This is a subheading!'),
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
          blockContainingText('altText', 'Pauline Clayton'),
          blockContainingText(
            'caption',
            'Former embroider Pauline Clayton described the gift as "lovely"',
          ),
        ],
      },
    },
  ];

  shouldShallowMatchSnapshot(
    'should render correctly',
    <MainContentContainer blocks={blocks} />,
  );
});
