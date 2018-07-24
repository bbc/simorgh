import React from 'react';
import { Headline, SubHeading } from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('Headings', () => {
  describe('Headline component', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <Headline>This is my headline.</Headline>,
    );
  });
  describe('SubHeading component', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <SubHeading>This is a SubHeading</SubHeading>,
    );
  });
});
