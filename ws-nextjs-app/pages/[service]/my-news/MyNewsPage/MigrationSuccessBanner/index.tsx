import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import { css } from '@emotion/react';

const styles = {
  banner: css({
    backgroundColor: '#e6f7e6',
    border: '1px solid #4caf50',
    borderRadius: '4px',
    padding: '1rem',
    marginBottom: '2rem',
  }),
  bannerHeading: css({
    marginBottom: '0.5rem',
    color: '#2e7d32',
  }),
  bannerText: css({
    color: '#1b5e20',
  }),
};

const MigrationSuccessBanner = () => {
  return (
    <div css={styles.banner} role="status" aria-live="polite">
      <Heading level={2} size="doublePica" css={styles.bannerHeading}>
        Welcome! Your articles have been saved
      </Heading>
      <Text size="longPrimer" css={styles.bannerText}>
        Your temporarily saved articles are now permanently stored in your
        account. You can access them anytime across all your devices.
      </Text>
    </div>
  );
};

export default MigrationSuccessBanner;
