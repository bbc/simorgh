import React from 'react';
import MainContent from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('MainContent', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <MainContent>
      <h1>This is some content</h1>
    </MainContent>,
  );
});
