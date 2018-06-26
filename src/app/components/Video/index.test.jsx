import React from 'react';
import snapshotTestHelper from '../../../__test__/snapshotTestHelper';
import Video from './index';

describe('Video', () => {
    describe('with no data' , () => {
        snapshotTestHelper.shouldMatchSnapshot(
            'should not render anything',
          <Video />,
          );
    })
});