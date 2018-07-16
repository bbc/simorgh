import React from 'react';
import HeadlineContainer from './index';
import { textBlock } from '../../models/blocks';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';

describe('HeadlineContainer', () => {
  describe('with no data', () => {
    isNull('should not render anything', <HeadlineContainer />);
  });

  describe('with data', () => {
    const data = textBlock('This is a headline!');

    shouldMatchSnapshot(
      'should render correctly',
      <HeadlineContainer {...data} />,
    );
  });
});
