import React from 'react';
import SubHeading from './index';
import snapshotTestHelper from '../../../__test__/snapshotTestHelper';
import { textBlock } from '../../../__test__/blockHelpers';

describe('SubHeading', () => {
  describe('with no data', () => {
    snapshotTestHelper.shouldMatchSnapshot(
      'should not render anything',
      <SubHeading />,
    );
  });

  describe('with data', () => {
    snapshotTestHelper.shouldMatchSnapshot(
      'should display the provided sub-heading',
      <SubHeading {...textBlock('The amazing sub-heading!?')} />,
    );

    snapshotTestHelper.shouldMatchSnapshot(
      'should display the subheading containing various symbols',
      <SubHeading {...textBlock('!@#$%^&*()\'"?/[]{}')} />,
    );
  });
});
