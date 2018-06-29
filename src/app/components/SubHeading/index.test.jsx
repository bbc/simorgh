import React from 'react';
import SubHeading from './index';
import { textBlock } from '../../models/blocks';
import snapshotTestHelper from '../../helpers/tests/snapshotTestHelper';

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
