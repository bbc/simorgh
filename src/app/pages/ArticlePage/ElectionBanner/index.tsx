/** @jsx jsx */

import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import AmpIframe from '#app/components/AmpIframe';
import useToggle from '#app/hooks/useToggle';
import { Tag } from '#app/components/Metadata/types';
import isLive from '#app/lib/utilities/isLive';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';
import BANNER_CONFIG from './config';

export default function ElectionBanner({ aboutTags }: { aboutTags: Tag[] }) {
  const { service } = useContext(ServiceContext);
  const { isAmp, isLite } = useContext(RequestContext);
  const { enabled: electionBannerEnabled }: { enabled: boolean | null } =
    useToggle('articleElectionBanner');

  if (isLive()) return null; // TODO: Remove once going Live
  if (isLite) return null;

  const { iframeHeight, iframeSrc, iframeSrcAmp, iframeTitle, thingIds } =
    BANNER_CONFIG;

  const validAboutTag = aboutTags?.some(tag => thingIds.includes(tag.thingId));

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
            imageHeight: iframeHeight,
            src: iframeSrcAmp.replace('{service}', service),
            image:
              'https://news.files.bbci.co.uk/include/vjassets/img/app-launcher.png',
            title: iframeTitle,
          }}
        />
      </div>
    );
  }

  return (
    <div data-testid="election-banner" css={styles.electionBannerWrapper}>
      <iframe
        title={iframeTitle}
        src={iframeSrc.replace('{service}', service)}
        scrolling="no"
        css={styles.electionBannerIframe}
        height={iframeHeight}
      />
    </div>
  );
}
