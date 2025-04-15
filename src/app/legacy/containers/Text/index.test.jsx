import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import {
  isNull,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import TextContainer from './index';
import { paragraphBlock, fragmentBlock } from './fixtures';

const defaultToggles = {
  eventTracking: {
    enabled: true,
  },
};

const listItemBlock = (id, listBlocks) => ({
  id,
  type: 'listItem',
  model: {
    blocks: listBlocks.map(blocks => paragraphBlock(id, blocks)),
  },
});

const listBlock = (id, blocks, type = 'unorderedList') => ({
  id,
  type,
  model: {
    blocks: [...blocks],
  },
});

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
        listBlock('mock-id-6', [
          listItemBlock('mock-id-6.1', [
            [fragmentBlock('mock-id-6.1.1', 'This is a list item')],
          ]),
        ]),
        listBlock(
          'mock-id-7',
          [
            listItemBlock('mock-id-7.1', [
              [fragmentBlock('mock-id-7.1.1', 'This is a list item')],
            ]),
          ],
          'orderedList',
        ),
      ],
    };

    it('should render correctly', () => {
      const { container } = render(
        <ToggleContextProvider toggles={defaultToggles}>
          <ServiceContextProvider service="news">
            <TextContainer {...data} />
          </ServiceContextProvider>
        </ToggleContextProvider>,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
