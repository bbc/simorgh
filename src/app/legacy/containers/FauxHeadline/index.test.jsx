import React from 'react';
import { textBlock } from '#models/blocks';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
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

    shouldMatchSnapshot(
      'should render correctly',
      FauxHeadlineContainerWithContext(data),
    );
  });

  describe('with plain text', () => {
    describe('headline', () => {
      const data = {
        blocks: blocksSingleFragment('Plain headline', []),
      };

      shouldMatchSnapshot(
        'should render <strong> containing correct text',
        FauxHeadlineContainerWithContext(data),
      );
    });
  });
});
