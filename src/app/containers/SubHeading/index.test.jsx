import React from 'react';
import SubHeadingContainer from './index';
import { textBlock } from '../../models/blocks';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';

describe('SubHeadingContainer', () => {
  describe('with no data', () => {
    isNull('should not render anything', <SubHeadingContainer />);
  });

  describe('with data', () => {
    shouldMatchSnapshot(
      'should display the provided sub-heading',
      <SubHeadingContainer {...textBlock('The amazing sub-heading!?')} />,
    );

    shouldMatchSnapshot(
      'should display the subheading containing various symbols',
      <SubHeadingContainer {...textBlock('!@#$%^&*()\'"?/[]{}')} />,
    );
  });
});
