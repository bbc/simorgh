import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Caption from './index';

describe('Caption', () => {
  shouldMatchSnapshot('should render correctly', <Caption />);

  it('should be able to be passed inner HTML', () => {
    const f = <Caption>test</Caption>; // eslint-disable-line
  });
});
