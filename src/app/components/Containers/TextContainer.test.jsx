import React from 'react';
import TextContainer from './TextContainer';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';
import { blockContainingText } from '../../models/blocks';

describe('TextContainer', () => {
  describe('with no data', () => {
    isNull('should return null', <TextContainer />);
  });

  describe('with headline props', () => {
    const data = blockContainingText('headline', 'This is a headline!');

    shouldMatchSnapshot(
      'should render a headline component',
      <TextContainer {...data} />,
    );
  });

  describe('with subheading props', () => {
    const data = blockContainingText('subheading', 'The amazing subheading!');

    shouldMatchSnapshot(
      'should render a headline component',
      <TextContainer {...data} />,
    );
  });
});
