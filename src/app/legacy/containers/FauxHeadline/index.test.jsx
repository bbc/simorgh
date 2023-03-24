import React from 'react';
import { textBlock } from '#models/blocks';
import {
  isNull,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
import { render } from '../../../components/react-testing-library-with-providers';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import { ServiceContext } from '../../../contexts/ServiceContext';
import FauxHeadlineContainer from '.';
import blocksSingleFragment from '../Headings/testHelpers';

const FauxHeadlineContainerWithContext = data => (
  <ServiceContext.Provider value={{ script: latin, service: 'news' }}>
    <FauxHeadlineContainer {...data} />
  </ServiceContext.Provider>
);

describe('FauxHeadline', () => {
  describe('with no data', () => {
    suppressPropWarnings(['blocks', 'supplied']);
    isNull('should not render anything', FauxHeadlineContainerWithContext());
  });

  describe('with headline data', () => {
    const data = textBlock('This is a headline!', 'id');

    it('should render correctly', () => {
      const { container } = render(FauxHeadlineContainerWithContext(data));
      expect(container).toMatchSnapshot();
    });

    describe('with plain text', () => {
      describe('headline', () => {
        // eslint-disable-next-line no-shadow
        const data = {
          blocks: blocksSingleFragment('Plain headline', []),
        };

        it('should render <strong> containing correct text', () => {
          const { container } = render(FauxHeadlineContainerWithContext(data));
          expect(container).toMatchSnapshot();
        });
      });
    });
  });
});
