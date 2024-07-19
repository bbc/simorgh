import React, { useMemo } from 'react';
import {
  isNull,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
import { render } from '../../../components/react-testing-library-with-providers';
import { textBlock } from '../../../models/blocks';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import { ServiceContext } from '../../../contexts/ServiceContext';
import FauxHeadlineContainer from '.';
import blocksSingleFragment from '../Headings/testHelpers';

const FauxHeadlineContainerWithContext = ({ data }) => {
  const fauxHeadlineValue = useMemo(
    () => ({ script: latin, service: 'news' }),
    [],
  );

  return (
    <ServiceContext.Provider value={fauxHeadlineValue}>
      <FauxHeadlineContainer {...data} />
    </ServiceContext.Provider>
  );
};

describe('FauxHeadline', () => {
  describe('with no data', () => {
    suppressPropWarnings(['blocks', 'supplied']);
    isNull('should not render anything', <FauxHeadlineContainerWithContext />);
  });

  describe('with headline data', () => {
    it('should render correctly', () => {
      const data = textBlock('This is a headline!', 'id');

      const { container } = render(
        <FauxHeadlineContainerWithContext data={data} />,
      );
      expect(container).toMatchSnapshot();
    });

    describe('with plain text', () => {
      describe('headline', () => {
        // eslint-disable-next-line no-shadow
        const data = {
          blocks: blocksSingleFragment('Plain headline', []),
        };

        it('should render <strong> containing correct text', () => {
          const { container } = render(
            <FauxHeadlineContainerWithContext data={data} />,
          );
          expect(container).toMatchSnapshot();
        });
      });
    });
  });
});
