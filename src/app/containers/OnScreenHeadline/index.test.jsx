import React from 'react';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
import OnScreenHeadlineContainer from '.';
import { ServiceContext } from '#contexts/ServiceContext';
import { textBlock } from '#models/blocks';
import blocksSingleFragment from '../Headings/testHelpers';

const OnScreenHeadlineContainerWithContext = data => (
  <ServiceContext.Provider value={{ script: latin, service: 'news' }}>
    <OnScreenHeadlineContainer {...data} />
  </ServiceContext.Provider>
);

describe('OnScreenHeadline', () => {
  describe('with no data', () => {
    suppressPropWarnings(['blocks', 'supplied']);
    isNull(
      'should not render anything',
      OnScreenHeadlineContainerWithContext(),
    );
  });

  describe('with headline data', () => {
    const data = {
      ...textBlock('This is a headline!'),
    };
    shouldMatchSnapshot(
      'should render correctly',
      OnScreenHeadlineContainerWithContext(data),
    );
  });

  describe('with plain text', () => {
    describe('headline', () => {
      const data = {
        blocks: blocksSingleFragment('Plain headline', []),
      };

      shouldMatchSnapshot(
        'should render <strong> containing correct text',
        OnScreenHeadlineContainerWithContext(data),
      );
    });
  });
});
