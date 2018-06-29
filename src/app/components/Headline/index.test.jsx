import React from 'react';
import Headline from './index';
import snapshotTestHelper from '../../helpers/tests/snapshotTestHelper';
import { textBlock } from '../../helpers/tests/blockHelpers';

describe('Headline', () => {
  describe('with no data', () => {
    snapshotTestHelper.shouldMatchSnapshot(
      'should not render anything',
      <Headline />,
    );
  });

  describe('with data', () => {
    const data = textBlock('This is a headline!');

    snapshotTestHelper.shouldMatchSnapshot(
      'should render correctly',
      <Headline {...data} />,
    );
  });
});
