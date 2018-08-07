import React from 'react';
import { Headline, SubHeading } from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('Headline component', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Headline>This is my headline.</Headline>,
  );
});
describe('SubHeading component', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <SubHeading text="This is a SubHeading" />,
  );
});
