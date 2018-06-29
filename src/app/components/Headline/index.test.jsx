import React from 'react';
import Headline from './index';
import { textBlock } from '../../models/blocks';
import snapshotTestHelper from '../../helpers/tests/snapshotTestHelper';

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
