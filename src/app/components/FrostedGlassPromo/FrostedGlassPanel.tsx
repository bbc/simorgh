import { useTheme } from '@emotion/react';
import { PropsWithChildren } from 'react';
import type { CSSProperties } from 'react';

import useImageColour from '../../hooks/useImageColour';

import styles from './index.module.scss';

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

  const panelStyle = {
    '--panel-colour-rgb': colour?.rgb?.join(', '),
  } as CSSProperties;

  return (
    <div className={styles.panelWrapper}>
      <div
        className={styles.panelChildren}
        data-is-loading={isLoading}
        style={panelStyle}
      >
        {children}
      </div>
      <div
        className={styles.panelBackground}
        style={{ backgroundImage: `url('${image}')` }}
      />
    </div>
  );
};

export default FrostedGlassPanel;
