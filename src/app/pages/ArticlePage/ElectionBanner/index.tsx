/** @jsx jsx */

import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import AmpIframe from '#app/components/AmpIframe';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Services } from '#app/models/types/global';
import useToggle from '#app/hooks/useToggle';
import { Tag } from '#app/components/Metadata/types';
import styles from './index.styles';

type ElectionBannerServices = Extract<Services, 'hindi'>;

const BANNER_CONFIG: Record<
  ElectionBannerServices,
  { iFrameSrc: string; thingLabel: Tag['thingLabel'] }
> = {
  hindi: {
    iFrameSrc:
      'https://news.test.files.bbci.co.uk/include/vjsthasia/2308-india-elections-2024-results-page/develop/english/election-banner/embed',
    thingLabel: 'लोकसभा चुनाव 2024',
  },
};

export default function ElectionBanner({ aboutTags }: { aboutTags: Tag[] }) {
  const { isAmp } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);
  const { enabled: electionBannerEnabled } = useToggle('electionBanner');

  const { iFrameSrc, thingLabel } =
    BANNER_CONFIG[service as ElectionBannerServices] ?? {};

  const validAboutTag = aboutTags.some(tag => tag.thingLabel === thingLabel);

  const showBanner = electionBannerEnabled && iFrameSrc && validAboutTag;

  if (!showBanner) return null;

  if (isAmp) {
    return (
      <div css={styles.electionBannerWrapperAmp}>
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
    <div css={styles.electionBannerWrapper}>
      <iframe
        title="Election Banner"
        src={iFrameSrc}
        scrolling="no"
        css={styles.electionBannerIframe}
      />
    </div>
  );
}
