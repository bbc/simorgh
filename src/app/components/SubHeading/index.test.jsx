import React from 'react';
import snapshotTestHelper from '../../../__test__/snapshotTestHelper';
import SubHeading from './index';
import { textBlock } from '../../../__test__/blockHelpers';

describe('SubHeading', () => {
  describe('with no data', () => {
    snapshotTestHelper.shouldMatchSnapshot(
      'should not render anything',
      <SubHeading />,
    );
  });

  describe('with data', () => {
    const data = textBlock('The amazing sub-heading!?');

    snapshotTestHelper.shouldMatchSnapshot(
      'should display the provided sub-heading',
      <SubHeading {...data} />,
    );
  });

  describe('with subheading containing various symbols', () => {
    const data = textBlock('!@#$%^&*()\'"?/[]{}');

    snapshotTestHelper.shouldMatchSnapshot(
      'should still display the heading',
      <SubHeading {...data} />,
    );
  });
});
