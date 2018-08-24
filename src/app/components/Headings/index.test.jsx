import React from 'react';
import { Headline, SubHeading } from './index';
import {
  shallowRender,
  shouldMatchSnapshot,
} from '../../helpers/tests/testHelpers';

describe('Headline component', () => {
  shouldMatchSnapshot(
    'should render correctly',
    shallowRender(<Headline>This is my headline.</Headline>),
  );
});
describe('SubHeading component', () => {
  shouldMatchSnapshot(
    'should render correctly',
    shallowRender(
      <SubHeading text="This is a SubHeading">This is a SubHeading</SubHeading>,
    ),
  );

  shouldMatchSnapshot(
    'attribute id should render without quotes',
    shallowRender(
      <SubHeading text="This 'is' a SubHeading">
        This is a SubHeading
      </SubHeading>,
    ),
  );

  shouldMatchSnapshot(
    'attribute id should render without double quotes',
    shallowRender(
      <SubHeading text="This &quot;is&quot; a SubHeading">
        This is a SubHeading
      </SubHeading>,
    ),
  );

  shouldMatchSnapshot(
    'attribute id should render without exclamation marks',
    shallowRender(
      <SubHeading text="This is! a SubHeading!">
        This is a SubHeading
      </SubHeading>,
    ),
  );
});
