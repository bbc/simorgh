import React from 'react';
import { storiesOf } from '@storybook/react';
import notes from '../README.md';
import ImagePlaceholder from '.';

const landscapeImageRatio = 56.25;
const squareImageRatio = 100;
const portraitImageRatio = 177.78;

storiesOf('Components/Images/ImagePlaceholder', module)
  .add(
    '16x9 image placeholder',
    () => <ImagePlaceholder ratio={landscapeImageRatio} />,
    { notes },
  )
  .add(
    '1x1 image placeholder',
    () => <ImagePlaceholder ratio={squareImageRatio} />,
    { notes },
  )
  .add(
    '9x16 image placeholder',
    () => <ImagePlaceholder ratio={portraitImageRatio} />,
    { notes },
  )
  .add(
    '16x9 dark mode image placeholder',
    () => <ImagePlaceholder ratio={landscapeImageRatio} darkMode />,
    { notes },
  )
  .add(
    'All image aspect ratios',
    () => (
      <>
        <ImagePlaceholder
          forwardStyle={{ background: 'none' }}
          ratio={landscapeImageRatio}
          darkMode
        />
        <ImagePlaceholder ratio={landscapeImageRatio} />
        <ImagePlaceholder ratio={squareImageRatio} />
        <ImagePlaceholder ratio={portraitImageRatio} />
      </>
    ),
    { notes },
  );
