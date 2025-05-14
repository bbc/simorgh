/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import { NavigationButtonsProp } from '#app/models/types/portraitVideoCarousel';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';
import { LeftChevron, RightChevron } from '../../icons';

export default ({
  canScrollLeft,
  canScrollRight,
  scroll,
}: NavigationButtonsProp) => {
  const { dir } = useContext(ServiceContext);

  return (
    <div css={styles.buttonGroupOverlay}>
      <div css={styles.buttonGroup}>
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scroll(dir === 'ltr' ? 'left' : 'right')}
          disabled={!canScrollLeft}
          css={styles.navButton}
        >
          <LeftChevron />
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scroll(dir === 'ltr' ? 'right' : 'left')}
          disabled={!canScrollRight}
          css={styles.navButton}
        >
          <RightChevron />
        </button>
      </div>
    </div>
  );
};
