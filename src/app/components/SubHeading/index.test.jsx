import React from 'react';
import snapshotTestHelper from '../../../__test__/snapshotTestHelper';
import SubHeading from './index';

describe('SubHeading', () => {
  describe('with no data', () => {
    snapshotTestHelper.shouldMatchSnapshot(
      'should not render anything',
      <SubHeading />,
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
                  text: 'The amazing sub-heading!?',
                },
              },
            ],
          },
        },
      ],
    };

    snapshotTestHelper.shouldMatchSnapshot(
      'should display the provided sub-heading',
      <SubHeading {...data} />,
    );
  });

  describe('with subheading containing various symbols', () => {
    const data = {
      blocks: [
        {
          model: {
            blocks: [
              {
                model: {
                  text: '!@#$%^&*()\'"?/[]{}',
                },
              },
            ],
          },
        },
      ],
    };

    snapshotTestHelper.shouldMatchSnapshot(
      'should still display the heading',
      <SubHeading {...data} />,
    );
  });
});
