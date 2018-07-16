import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Caption from './index';

describe('Caption', () => {
  shouldMatchSnapshot('should render correctly', <Caption />);

  it('should be able to be passed stuff', () => {
    const f = <Caption>test</Caption>;
    console.log(f.children);
  });
});
