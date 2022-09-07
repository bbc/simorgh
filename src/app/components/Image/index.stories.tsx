import React from 'react';
import ThemeProvider from '../ThemeProvider';

import Image from '.';

const Component = () => (
  <ThemeProvider service="mundo" variant="default">
    <Image
      alt="orange 1"
      src="41BC/test/_63482861_orange1.jpg"
      primarySrcset="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w"
      primaryMediaType="image/webp"
      fallbackSrcset="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w"
      fallbackMediaType="image/jpeg"
      sizes="(max-width: 600px) 480px, 800px"
      width={500}
      height={281}
    />
  </ThemeProvider>
);

export default {
  title: 'New Components/Image',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
