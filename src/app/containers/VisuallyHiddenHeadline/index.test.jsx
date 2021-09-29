import React from 'react';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import VisuallyHiddenHeadlineContainer from '.';
import { textBlock } from '#models/blocks';
import blocksSingleFragment from '../Headings/testHelpers';

describe('VisuallyHiddenHeadline', () => {
  describe('with no data', () => {
    suppressPropWarnings(['blocks', 'supplied']);
    isNull(
      'should not render anything',
      <VisuallyHiddenHeadlineContainer data={{}} />,
    );
  });

  describe('with headline data', () => {
    const data = {
      ...textBlock('This is a headline!'),
    };
    shouldMatchSnapshot(
      'should render correctly',
      <VisuallyHiddenHeadlineContainer {...data} />,
    );
  });

  describe('with plain text', () => {
    describe('headline', () => {
      const data = {
        blocks: blocksSingleFragment('Plain headline', []),
      };

      shouldMatchSnapshot(
        'should render h1 containing correct text',
        <VisuallyHiddenHeadlineContainer {...data} />,
      );
    });
  });
});
