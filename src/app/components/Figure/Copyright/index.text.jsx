import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import VisuallyHiddenText from '../../VisuallyHiddenText';
import Copyright from './index';

describe('Copyright', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Copyright>
      <VisuallyHiddenText>Copyright Getty image</VisuallyHiddenText>
    </Copyright>,
  );
});
