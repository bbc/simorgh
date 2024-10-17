/** @jsx jsx */

import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import AmpIframe from '#app/components/AmpIframe';
import useToggle from '#app/hooks/useToggle';
import { Tag } from '#app/components/Metadata/types';
import isLive from '#app/lib/utilities/isLive';
import styles from './index.styles';
import BANNER_CONFIG from './config';

export default function ElectionBanner({ aboutTags }: { aboutTags: Tag[] }) {
  const { isAmp } = useContext(RequestContext);
  const { enabled: electionBannerEnabled }: { enabled: boolean | null } =
    useToggle('articleElectionBanner');

  if (isLive()) return null; // TODO: Remove once going Live

  const { iframeSrc, thingId } = BANNER_CONFIG;

  const validAboutTag = aboutTags?.some(tag => tag.thingId === thingId);

  const showBanner = validAboutTag && electionBannerEnabled;

  if (!showBanner) return null;

  if (isAmp) {
    return (
      <div
        data-testid="election-banner-amp"
        css={styles.electionBannerWrapperAmp}
      >
        <AmpIframe
          ampMetadata={{
            imageWidth: 1,
            imageHeight: 1,
            src: iframeSrc,
            image: '',
          }}
        />
      </div>
    );
  }

  return (
    <div data-testid="election-banner" css={styles.electionBannerWrapper}>
      <iframe
        title="US Election results"
        src={iframeSrc}
        scrolling="no"
        css={styles.electionBannerIframe}
      />
    </div>
  );
}
