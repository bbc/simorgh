import React from 'react';
import { render } from '@testing-library/react';
import { textBlock } from '#models/blocks';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
import VisuallyHiddenHeadlineContainer from '.';
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

      it('should have an id for the skiplink with value "content"', () => {
        const { getByText } = render(
          <VisuallyHiddenHeadlineContainer {...data} />,
        );

        expect(getByText('Plain headline').getAttribute('id')).toBe('content');
      });
    });
  });
});
