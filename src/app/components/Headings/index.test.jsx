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
    <SubHeading text="This is a SubHeading">This is a SubHeading</SubHeading>,
  );

  shouldMatchSnapshot(
    'should render without quotes',
    <SubHeading text="This 'is' a SubHeading">This is a SubHeading</SubHeading>,
  );

  shouldMatchSnapshot(
    'should render without double quotes',
    <SubHeading text="This &quot;is&quot; a SubHeading">
      This is a SubHeading
    </SubHeading>,
  );

  shouldMatchSnapshot(
    'should render without exclamation marks',
    <SubHeading text="This is! a SubHeading!">This is a SubHeading</SubHeading>,
  );
});
