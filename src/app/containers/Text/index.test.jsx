import React from 'react';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import TextContainer from './index';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import {
  paragraphBlock,
  fragmentBlock,
  unorderedListBlock,
  listItemBlock,
} from './fixtures';

describe('TextContainer', () => {
  describe('with no data', () => {
    suppressPropWarnings(['blocks', 'undefined']);
    isNull('should return null', <TextContainer />);
  });

  describe('with data', () => {
    const data = {
      blocks: [
        paragraphBlock('mock-id-1', [
          fragmentBlock('mock-id-1.1', 'This is a 1st paragraph block.'),
        ]),
        paragraphBlock('mock-id-2', [
          fragmentBlock('mock-id-2.1', 'This is a 2nd paragraph block.'),
        ]),
        paragraphBlock('mock-id-3', [
          fragmentBlock('mock-id-3.1', 'This is a 3rd paragraph block.'),
        ]),
        paragraphBlock('mock-id-4', [
          fragmentBlock('mock-key-4.1', 'This is a 4th paragraph block..'),
        ]),
        paragraphBlock('mock-id-5', [
          fragmentBlock('mock-id-5.1', 'This is a 5th paragraph block.'),
        ]),
        unorderedListBlock('mock-id-6', [
          listItemBlock('mock-id-6.1', [
            paragraphBlock('mock-id-6.1.1', [
              fragmentBlock(
                'mock-id-6.1.1.1',
                'This is a 1st list item in an unordered list block.',
              ),
            ]),
          ]),
          listItemBlock('mock-id-6.2', [
            paragraphBlock('mock-id-6.2.1', [
              fragmentBlock(
                'mock-id-6.2.1.1',
                'This is a 2nd list item in an unordered list block.',
              ),
            ]),
          ]),
        ]),
      ],
    };

    shouldMatchSnapshot(
      'should render correctly',
      <ServiceContextProvider service="news">
        <TextContainer {...data} />
      </ServiceContextProvider>,
    );
  });
});
