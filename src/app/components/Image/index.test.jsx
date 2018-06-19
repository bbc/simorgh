import React from 'react';
import snapshotTestHelper from '../../../__test__/snapshotTestHelper';
import Image from './index';

describe('Image', () => {
  describe('with no data', () => {
    snapshotTestHelper.shouldMatchSnapshot(
      'should not render anything',
      <Image />,
    );
  });
});
