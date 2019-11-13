import React from 'react';
import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
import Blocks from './index';
import { blockContainingText, singleTextBlock } from '#models/blocks';

const unknownTestBlock = {
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
};

const parentBlockNotAllowed = {
  type: 'image',
  model: {
    blocks: [
      {
        type: 'rawImage',
        model: {
          width: 640,
          height: 420,
          locator: 'E7DB/production/_101655395_paulineclayton.jpg',
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
};

describe('Blocks', () => {
  const componentsToRender = {
    headline: () => <h1>A headline</h1>,
    subheadline: () => <h2>A subheadline</h2>,
    text: () => <p>Some text</p>,
  };

  const blocks = [
    blockContainingText('headline', 'This is a headline!', 'mock-id-1'),
    blockContainingText('subheadline', 'This is a subheadline!', 'mock-id-2'),
    singleTextBlock('This is some text content!', 'mock-id-3'),
  ];

  shouldMatchSnapshot(
    'should render correctly',
    <Blocks blocks={blocks} componentsToRender={componentsToRender} />,
  );

  describe('with mixed set of known and unknown blocks', () => {
    const mixedBlocks = [
      blockContainingText('headline', 'This is a headline!', 'mock-id-1'),
      blockContainingText('subheadline', 'This is a subheadline!', 'mock-id-2'),
      singleTextBlock('This is some text content!', 'mock-id-3'),
      unknownTestBlock,
      parentBlockNotAllowed,
    ];

    shouldMatchSnapshot(
      'should render known blocks; unknown blocks rendered null',
      <Blocks blocks={mixedBlocks} componentsToRender={componentsToRender} />,
    );
  });

  describe('with unknown blocks', () => {
    const unknownBlocks = [unknownTestBlock, parentBlockNotAllowed];

    isNull(
      'should render correctly as null',
      <Blocks blocks={unknownBlocks} componentsToRender={componentsToRender} />,
    );
  });
});
