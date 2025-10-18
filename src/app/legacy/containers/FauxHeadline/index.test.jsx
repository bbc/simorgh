import React from 'react';
import {
  isNull,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
import { render } from '../../../components/react-testing-library-with-providers';
import { textBlock } from '../../../models/blocks';
import FauxHeadlineContainer from '.';
import blocksSingleFragment from '../Headings/testHelpers';

describe('FauxHeadline', () => {
  describe('with no data', () => {
    suppressPropWarnings(['blocks', 'supplied']);
    isNull('should not render anything', <FauxHeadlineContainer />);
  });

  describe('with headline data', () => {
    it('should render correctly', () => {
      const data = textBlock('This is a headline!', 'id');

      const { container } = render(<FauxHeadlineContainer {...data} />);
      expect(container).toMatchSnapshot();
    });

    describe('with plain text', () => {
      describe('headline', () => {
        // eslint-disable-next-line no-shadow
        const data = {
          blocks: blocksSingleFragment('Plain headline', []),
        };

        it('should render <strong> containing correct text', () => {
          const { container } = render(<FauxHeadlineContainer {...data} />);
          expect(container).toMatchSnapshot();
        });
      });
    });
  });
});
