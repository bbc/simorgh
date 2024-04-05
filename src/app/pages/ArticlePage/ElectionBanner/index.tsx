/** @jsx jsx */

import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import AmpIframe from '#app/components/AmpIframe';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Services } from '#app/models/types/global';
import styles, { BANNER_HEIGHT } from './index.styles';

const IFRAME_SRC =
  'https://news.test.files.bbci.co.uk/include/vjsthasia/2308-india-elections-2024-results-page/develop/english/election-banner/embed';

const SERVICES_WITH_ELECTION_BANNER: Services[] = ['hindi'];

export default function ElectionBanner() {
  const { isAmp } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);

  if (!SERVICES_WITH_ELECTION_BANNER.includes(service)) {
    return null;
  }

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
