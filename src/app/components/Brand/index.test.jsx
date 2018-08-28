import React from 'react';
import Brand from './index';

import {
  shallowRender,
  shouldMatchSnapshot,
} from '../../helpers/tests/testHelpers';

describe('Brand', () => {
  shouldMatchSnapshot(
    'should render correctly with a default indented logo',
    shallowRender(<Brand />),
  );
  shouldMatchSnapshot(
    'should render correctly with indentedLogo false',
    shallowRender(<Brand indentedLogo={false} />),
  );
});
