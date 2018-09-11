import React from 'react';
import Article from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('Article', () => {
  shouldMatchSnapshot(
    'should render correctly with a child',
    <Article>
      <span>Child element</span>
    </Article>,
  );
});
