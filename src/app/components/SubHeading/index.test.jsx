import React from 'react';
import SubHeading from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('SubHeading', () => {
  describe('with data', () => {
    shouldMatchSnapshot(
      'should display the provided sub-heading',
      <SubHeading text="The amazing sub-heading!?" />,
    );

    shouldMatchSnapshot(
      'should display the subheading containing various symbols',
      <SubHeading text="!@#$%^*()\?/'[]{}\" />,
    );
  });
});
