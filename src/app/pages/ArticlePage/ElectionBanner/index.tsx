/** @jsx jsx */

import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import AmpIframe from '#app/components/AmpIframe';
import styles, { BANNER_HEIGHT } from './index.styles';

const IFRAME_SRC =
  'https://news.test.files.bbci.co.uk/include/vjsthasia/2308-india-elections-2024-results-page/develop/english/election-banner/embed';

export default function ElectionBanner() {
  const { isAmp } = useContext(RequestContext);

  if (isAmp) {
    return (
      <div css={styles.electionBannerWrapperAmp}>
        <AmpIframe
          ampMetadata={{
            imageWidth: 1,
            imageHeight: BANNER_HEIGHT,
            src: IFRAME_SRC,
            image: '',
          }}
        />
      </div>
    );
  }

  return (
    <div css={styles.electionBannerWrapper}>
      <iframe
        title="Election Banner"
        src={IFRAME_SRC}
        scrolling="no"
        css={styles.electionBannerIframe}
      />
    </div>
  );
}
