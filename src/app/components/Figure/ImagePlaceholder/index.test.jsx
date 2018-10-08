import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import ImagePlaceholder from './index';

const landscapeImageRatio = 56.25;

describe('ImagePlaceholder', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ImagePlaceholder ratio={landscapeImageRatio} />,
  );
});
