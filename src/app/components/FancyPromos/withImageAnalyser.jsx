import React, { useState, useRef, useEffect } from 'react';
import * as Vibrant from 'node-vibrant';

import { normalisePalette } from './utils';

import Debugger from './Debugger';

const withImageAnalyser =
  Component =>
  ({ image, debug, ...props }) => {
    const [palette, setPalette] = useState(null);

    const vibrantWorker = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
      if (vibrantWorker.current || imageRef.current === image) return;
      vibrantWorker.current = Vibrant.from(image).getPalette((err, output) => {
        setPalette(output);
        vibrantWorker.current = null;
        imageRef.current = image;
      });
    });

    if (!palette)
      return 'Could not download image.  That server is probably blocking us - try a BBC image instead';

    const normalisedPalette = normalisePalette(palette);

    console.log('rendering');

    return (
      <>
        <Component {...props} image={image} palette={normalisedPalette} />
        {debug && (
          <>
            <Debugger showImage image={image} palette={normalisedPalette}>
              Debug Output
            </Debugger>
            <Debugger
              image={image}
              palette={normalisePalette(palette, { maximumLuminance: 0.1 })}
            >
              High Contrast Variants
            </Debugger>
          </>
        )}
      </>
    );
  };

export default withImageAnalyser;
