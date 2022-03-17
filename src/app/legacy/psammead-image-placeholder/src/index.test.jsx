import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ImagePlaceholder from '.';

const landscapeImageRatio = 56.25;
const portraitImageRatio = 177.78;
const squareImageRatio = 100;

describe('ImagePlaceholder', () => {
  shouldMatchSnapshot(
    'should render landscape images correctly',
    <ImagePlaceholder ratio={landscapeImageRatio} />,
  );
  shouldMatchSnapshot(
    'should render portrait images correctly',
    <ImagePlaceholder ratio={portraitImageRatio} />,
  );
  shouldMatchSnapshot(
    'should render square images correctly',
    <ImagePlaceholder ratio={squareImageRatio} />,
  );
  shouldMatchSnapshot(
    'should render dark mode version correctly',
    <ImagePlaceholder ratio={landscapeImageRatio} darkMode />,
  );
});
