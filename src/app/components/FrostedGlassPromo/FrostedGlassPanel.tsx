import React, { PropsWithChildren } from 'react';

import useImageColour from '../../hooks/useImageColour';

const BLUR_RADIUS = 15;
const scaleAmount = 1 + BLUR_RADIUS / 100;
const scaleX = `scaleX(${scaleAmount})`;
const scaleY = `scaleY(${-1 * scaleAmount})`;

type FrostedGlassPanelProps = {
  image: string;
  minimumContrast?: number;
  paletteSize?: number;
};

const FrostedGlassPanel = ({
  image,
  children,
  minimumContrast = 8,
  paletteSize = 10,
}: PropsWithChildren<FrostedGlassPanelProps>) => {
  const { isLoading, colour } = useImageColour(image, {
    fallbackColour: '#525252', // gel-grey-8
    minimumContrast,
    contrastColour: '#ffffff',
    paletteSize,
  });

  const backgroundImageStyle = {
    backgroundImage: `url('${image}')`,
  };

  const backgroundColour = colour?.rgb?.join(',');

  return (
    <div className="
      relative
      overflow-hidden
      flex
      flex-col
      h-full
    ">
      <div
        className="
          relative
          z-[3]
          pb-8
          transition-[background]
          duration-500
          ease-in-out
          h-full
        "
        style={{
          background: isLoading 
            ? `rgb(${backgroundColour})` 
            : `rgba(${backgroundColour}, 0.62)`,
        }}
      >
        {children}
      </div>
      <div
        className="
          hidden
          supports-[filter:blur(15px)]:block
          z-[1]
          absolute
          bottom-0
          top-[-15px]
          left-0
          right-0
          bg-gel-grey-8
          bg-no-repeat
          bg-cover
          bg-bottom
        "
        style={{
          ...backgroundImageStyle,
          transform: `${scaleX} ${scaleY}`,
          filter: `blur(${BLUR_RADIUS}px)`,
        }}
      />
    </div>
  );
};

export default FrostedGlassPanel;
