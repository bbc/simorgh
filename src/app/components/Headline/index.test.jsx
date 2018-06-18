import React from 'react';
import snapshotTestHelper from '../../../__test__/snapshotTestHelper';
import Headline from './index';

describe('Headline', () => {
  describe('with no data', () => {
    snapshotTestHelper.shouldMatchSnapshot(
      'should not render anything',
      <Headline />,
    );
  });

  describe('with data', () => {
    const data = {
      blocks: [
        {
          model: {
            blocks: [
              {
                model: {
                  text: 'This is a headline!',
                },
              },
            ],
          },
        },
      ],
    };

    snapshotTestHelper.shouldMatchSnapshot(
      'should render correctly',
      <Headline {...data} />,
    );
  });
});
