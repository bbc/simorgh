import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import Paragraph from './index';

describe('Paragraph', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Paragraph>This is some paragraph content.</Paragraph>,
  );
});
