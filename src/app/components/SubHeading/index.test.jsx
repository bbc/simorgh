import React from 'react';
import SubHeading from './index';
import { containerText } from '../../models/blocks';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('SubHeading', () => {
  describe('with data', () => {
    shouldMatchSnapshot(
      'should display the provided sub-heading',
      <SubHeading {...containerText('The amazing sub-heading!?')} />,
    );

    shouldMatchSnapshot(
      'should display the subheading containing various symbols',
      <SubHeading {...containerText('!@#$%^&*()\'"?/[]{}')} />,
    );
  });
});
