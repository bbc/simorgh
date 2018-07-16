import React from 'react';
import SubHeading from './index';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';

describe('SubHeading', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <SubHeading>should display the provided sub-heading</SubHeading>,
  );
});
