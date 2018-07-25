import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import MainContentContainer from './index';
import { mainContentBlock } from '../../models/blocks';

describe('MainContent', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <MainContentContainer blocks={mainContentBlock} />,
  );
});
