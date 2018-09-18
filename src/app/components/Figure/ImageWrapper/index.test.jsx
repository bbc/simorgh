import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import ImageWrapper from './index';

const landscapeImageRatio = 56.25;

describe('ImageWrapper', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ImageWrapper ratio={landscapeImageRatio} />,
  );
});
