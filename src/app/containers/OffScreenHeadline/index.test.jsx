import React from 'react';
import { render } from 'enzyme';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import OffScreenHeadlineContainer from '.';
import { textBlock } from '#models/blocks';
import blocksSingleFragment from '../Headings/testHelpers';

const getId = enzymeWrapper => enzymeWrapper[0].attribs.id;

describe('OffScreenHeadline', () => {
  describe('with no data', () => {
    suppressPropWarnings(['blocks', 'supplied']);
    isNull(
      'should not render anything',
      <OffScreenHeadlineContainer data={{}} />,
    );
  });

  describe('with headline data', () => {
    const data = {
      ...textBlock('This is a headline!'),
    };
    shouldMatchSnapshot(
      'should render correctly',
      <OffScreenHeadlineContainer {...data} />,
    );
  });

  describe('with plain text', () => {
    describe('headline', () => {
      const data = {
        blocks: blocksSingleFragment('Plain headline', []),
      };

      shouldMatchSnapshot(
        'should render h1 containing correct text',
        <OffScreenHeadlineContainer {...data} />,
      );

      it('should have an id for the skiplink with value "content"', () => {
        const headlineHeading = render(
          <OffScreenHeadlineContainer {...data} />,
        );

        expect(getId(headlineHeading)).toBe('content');
      });
    });
  });
});
