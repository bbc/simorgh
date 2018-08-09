import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Caption from './index';

describe('Caption', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Caption text="This is some Caption text" />,
  );
});
