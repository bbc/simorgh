import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import Blocks from './index';
import { blockContainingText, singleTextBlock } from '../../models/blocks';

describe('Blocks', () => {
  const blocks = [
    blockContainingText('headline', 'This is a headline!'),
    blockContainingText('subheading', 'This is a subheading!'),
    singleTextBlock('This is some text content!'),
    {
      type: 'test',
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
      type: 'image',
      model: {
        blocks: [
          {
            type: 'rawImage',
            model: {
              width: 640,
              height: 420,
              locator:
                'http://c.files.bbci.co.uk/E7DB/production/_101655395_paulineclayton.jpg',
              originCode: 'cpsprodpb',
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

  const componentsToRender = {
    headline: () => <h1>A headline</h1>,
    subheading: () => <h2>A subheading</h2>,
    text: () => <p>Some text</p>,
  };

  shouldShallowMatchSnapshot(
    'should render correctly',
    <Blocks blocks={blocks} componentsToRender={componentsToRender} />,
  );
});
