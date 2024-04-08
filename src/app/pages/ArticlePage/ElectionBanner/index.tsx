/** @jsx jsx */

import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import AmpIframe from '#app/components/AmpIframe';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useToggle from '#app/hooks/useToggle';
import { Tag } from '#app/components/Metadata/types';
import pixelsToRem from '#app/utilities/pixelsToRem';
import styles from './index.styles';
import { BANNER_CONFIG, ElectionBannerServices } from './config';

export default function ElectionBanner({ aboutTags }: { aboutTags: Tag[] }) {
  const { isAmp } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);
  const { enabled: electionBannerEnabled }: { enabled: boolean | null } =
    useToggle('electionBanner');

  const { iFrameSrc, height, thingLabel } =
    BANNER_CONFIG[service as ElectionBannerServices] ?? {};

  const validAboutTag = aboutTags.some(tag => tag.thingLabel === thingLabel);

  // TODO: ensure toggle is working
  const showBanner = !electionBannerEnabled && !!iFrameSrc && validAboutTag;

  if (!showBanner) return null;

  if (isAmp) {
    return (
      <div
        css={[
          styles.electionBannerWrapperAmp,
          { height: `${pixelsToRem(height)}rem` },
        ]}
      >
        <AmpIframe
          ampMetadata={{
            imageWidth: 1,
            imageHeight: 1,
            src: iFrameSrc,
            image: '',
          }}
        />
      </div>
    );
  }

  return (
    <div
      css={[
        styles.electionBannerWrapper,
        { height: `${pixelsToRem(height)}rem` },
      ]}
    >
      <iframe
        title="Election Banner"
        src={iFrameSrc}
        scrolling="no"
        css={styles.electionBannerIframe}
      />
    </div>
  );
}
