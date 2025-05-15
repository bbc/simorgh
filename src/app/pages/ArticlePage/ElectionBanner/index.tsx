/** @jsx jsx */

import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import AmpIframe from '#app/components/AmpIframe';
import useToggle from '#app/hooks/useToggle';
import { Tag } from '#app/components/Metadata/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { MetadataTaggings } from '#app/models/types/metadata';
import { Services } from '#app/models/types/global';
import styles from './index.styles';
import BANNER_CONFIG from './config';

type Props = {
  aboutTags: Tag[];
  taggings: MetadataTaggings;
};

const handleUrlServiceTransform = (url: string, service: Services) => {
  switch (service) {
    case 'turkce':
      return url.replace('{service}', 'turkish');
    case 'news':
      return url.replace('{service}', 'english');
    default:
      return url.replace('{service}', service);
  }
};

export default function ElectionBanner({ aboutTags, taggings }: Props) {
  const { service } = useContext(ServiceContext);
  const { isAmp, isLite } = useContext(RequestContext);
  const { enabled: electionBannerEnabled }: { enabled: boolean | null } =
    useToggle('electionBanner');

  if (isLite) return null;

  const {
    heights,
    iframeSrc,
    iframeDevSrc,
    editorialSensitivityId,
    usElectionThingId,
  } = BANNER_CONFIG;

  const isEditoriallySensitive = taggings?.some(({ value }) =>
    value.includes(editorialSensitivityId),
  );

  const validAboutTag = aboutTags?.find(
    ({ thingId }) => thingId === usElectionThingId,
  );

  const showBanner =
    !isEditoriallySensitive && validAboutTag && electionBannerEnabled;

  if (!showBanner) return null;

  const {
    SIMORGH_APP_ENV,
    SIMORGH_INCLUDES_BASE_URL,
    SIMORGH_INCLUDES_BASE_AMP_URL,
  } = getEnvConfig();

  const iframeSrcToUse = SIMORGH_APP_ENV === 'live' ? iframeSrc : iframeDevSrc;
  const iframeSrcWithService = handleUrlServiceTransform(
    iframeSrcToUse,
    service,
  );

  if (isAmp) {
    return (
      <div data-testid="election-banner" css={styles.electionBannerWrapperAmp}>
        <AmpIframe
          ampMetadata={{
            imageWidth: 1,
            imageHeight: 1,
            src: `${SIMORGH_INCLUDES_BASE_AMP_URL}/${iframeSrcWithService}/amp`,
            image:
              'https://news.files.bbci.co.uk/include/vjassets/img/app-launcher.png',
            title: validAboutTag.thingLabel,
          }}
        />
      </div>
    );
  }

  return (
    <div data-testid="election-banner" css={styles.electionBannerWrapper}>
      <iframe
        title={validAboutTag.thingLabel}
        src={`${SIMORGH_INCLUDES_BASE_URL}/${iframeSrcWithService}`}
        scrolling="no"
        css={styles.electionBannerIframe}
        height={heights.desktop}
        width="100%"
      />
    </div>
  );
}
