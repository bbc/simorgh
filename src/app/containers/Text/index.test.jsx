import React from 'react';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import TextContainer from './index';

describe('TextContainer', () => {
  describe('with no data', () => {
    suppressPropWarnings(['blocks', 'undefined']);
    isNull('should return null', <TextContainer />);
  });

  describe('with data', () => {
    const fragmentBlock = (text, attributes = []) => ({
      type: 'fragment',
      model: {
        text,
        attributes,
      },
    });

    const paragraphBlock = (id = null, blocks) => ({
      id,
      type: 'paragraph',
      model: {
        id,
        blocks,
      },
    });

    const data = {
      blocks: [
        paragraphBlock('mock-id-1', [
          fragmentBlock('This is a 1st paragraph block.'),
        ]),
        paragraphBlock('mock-id-2', [
          fragmentBlock('This is a 2nd paragraph block.'),
        ]),
        paragraphBlock('mock-id-3', [
          fragmentBlock('This is a 3rd paragraph block.'),
        ]),
        paragraphBlock('mock-id-4', [
          fragmentBlock('This is a 4th paragraph block..'),
        ]),
        paragraphBlock('mock-id-5', [
          fragmentBlock('This is a 5th paragraph block.'),
        ]),
      ],
    };

    shouldMatchSnapshot('should render correctly', <TextContainer {...data} />);
  });
});
