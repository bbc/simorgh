import React from 'react';
import SubHeading from './index';
import { textBlock } from '../../models/blocks';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';

describe('SubHeading', () => {
  describe('with no data', () => {
    isNull('should not render anything', <SubHeading />);
  });

  describe('with data', () => {
    shouldMatchSnapshot(
      'should display the provided sub-heading',
      <SubHeading {...textBlock('The amazing sub-heading!?')} />,
    );

    shouldMatchSnapshot(
      'should display the subheading containing various symbols',
      <SubHeading {...textBlock('!@#$%^&*()\'"?/[]{}')} />,
    );
  });
});
