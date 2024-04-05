/** @jsx jsx */

import { jsx } from '@emotion/react';
import styles from './index.styles';

export default function ElectionBanner() {
  return (
    <div css={styles.electionBannerWrapper}>
      <iframe
        css={styles.electionBannerIframe}
        title="Election Banner"
        src="https://news.test.files.bbci.co.uk/include/vjsthasia/2308-india-elections-2024-results-page/develop/english/election-banner/embed"
        scrolling="no"
      />
    </div>
  );
}
