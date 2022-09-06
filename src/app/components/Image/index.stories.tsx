import React from 'react';
import ThemeProvider from '../ThemeProvider';

import Image from '.';

const Component = () => {
  return (
    <ThemeProvider service="mundo">
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
      />
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/Image',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
