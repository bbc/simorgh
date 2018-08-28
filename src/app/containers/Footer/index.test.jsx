import React from 'react';
import FooterContainer from './index';
import {
  shallowRender,
  shouldMatchSnapshot,
} from '../../helpers/tests/testHelpers';

describe(`FooterContainer`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    shallowRender(<FooterContainer />),
  );
});
