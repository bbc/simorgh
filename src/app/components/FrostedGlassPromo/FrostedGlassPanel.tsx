/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { PropsWithChildren } from 'react';

import useImageColour from '#hooks/useImageColour';

import styles from './styles';

const BLUR_RADIUS = 15;

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
  const {
    palette: { GREY_8 },
  } = useTheme();

  const { isLoading, colour } = useImageColour(image, {
    fallbackColour: GREY_8,
    minimumContrast,
    contrastColour: '#ffffff',
    paletteSize,
  });

  const backgroundImageStyle = {
    backgroundImage: `url('${image}')`,
  };

  return (
    <div css={styles.panelWrapper}>
      <div
        css={[
          styles.panelChildren,
          { background: `rgb(${colour?.rgb?.join(',')})` },
          !isLoading && {
            [`@supports (filter: blur(${BLUR_RADIUS}px))`]: {
              background: `rgba(${colour?.rgb?.join(',')}, 0.62)`,
            },
          },
        ]}
      >
        {children}
      </div>
      <div css={styles.panelBackground} style={backgroundImageStyle} />
    </div>
  );
};

export default FrostedGlassPanel;
