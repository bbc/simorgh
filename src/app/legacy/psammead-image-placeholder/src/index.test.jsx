import React from 'react';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
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
