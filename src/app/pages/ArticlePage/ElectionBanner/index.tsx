/** @jsx jsx */

import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import AmpIframe from '#app/components/AmpIframe';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useToggle from '#app/hooks/useToggle';
import { Tag } from '#app/components/Metadata/types';
import pixelsToRem from '#app/utilities/pixelsToRem';
import isLive from '#app/lib/utilities/isLive';
import styles from './index.styles';
import { BANNER_CONFIG, ElectionBannerServices } from './config';

export default function ElectionBanner({ aboutTags }: { aboutTags: Tag[] }) {
  const { isAmp } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);
  const { enabled: electionBannerEnabled }: { enabled: boolean | null } =
    useToggle('indianElectionBanner');

  if (isLive()) return null; // TODO: Remove once going Live
  if (!electionBannerEnabled) return null;

  const { iframeSrc, height, thingLabel } =
    BANNER_CONFIG[service as ElectionBannerServices] ?? {};

  const validAboutTag = aboutTags?.some(tag => tag.thingLabel === thingLabel);

  const showBanner = service in BANNER_CONFIG && validAboutTag;

  if (!showBanner) return null;

  if (isAmp) {
    return (
      <div
        data-testid="election-banner-amp"
        css={[
          styles.electionBannerWrapperAmp,
          { height: `${pixelsToRem(height)}rem` },
        ]}
      >
        <AmpIframe
          ampMetadata={{
            imageWidth: 1,
            imageHeight: height,
            src: iframeSrc,
            image: '',
          }}
        />
      </div>
    );
  }

  return (
    <div
      data-testid="election-banner"
      css={[
        styles.electionBannerWrapper,
        { height: `${pixelsToRem(height)}rem` },
      ]}
    >
      <iframe
        title="Election Banner"
        src={iframeSrc}
        scrolling="no"
        css={styles.electionBannerIframe}
      />
    </div>
  );
}
