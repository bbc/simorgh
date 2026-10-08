import { use } from 'react';
import Script from 'next/script';
import { RequestContext } from '#app/contexts/RequestContext';
import AmpIframe from '#app/components/AmpIframe';
import useToggle from '#app/hooks/useToggle';
import { Tag } from '#app/components/Metadata/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { MetadataTaggings } from '#app/models/types/metadata';
import styles, { DEFAULT_HEIGHTS_AP, DEFAULT_HEIGHTS_VJ } from './index.styles';

type Props = {
  aboutTags?: Tag[];
  taggings: MetadataTaggings;
};

type ToggleType = {
  enabled: boolean | null;
  value: string | null;
};

const SENSITIVE_ARTICLE_ID = 'f2b5dd0e-dda0-454c-893d-792d46ff48c3';
const ELECTION_BANNER_TITLE = 'Election banner';

export default function ElectionBanner({ aboutTags, taggings }: Props) {
  const { electionBanner } = use(ServiceContext);
  const { isAmp, isLite } = use(RequestContext);
  const { enabled: electionBannerEnabled }: ToggleType =
    useToggle('electionBanner');

  if (isLite || !electionBanner) return null;

  const { iframeSrc, iframeDevSrc, electionThingIds, assocPressIframeSrc } =
    electionBanner;

  const isEditoriallySensitive = taggings?.some(({ value }) =>
    value.includes(SENSITIVE_ARTICLE_ID),
  );

  const hasValidTagLivePage = taggings?.some(({ value }) =>
    electionThingIds.some(electionThingId => value.includes(electionThingId)),
  );

  const validAboutTag = aboutTags?.find(({ thingId }) =>
    electionThingIds.includes(thingId),
  );

  const hasValidElectionTag = Boolean(validAboutTag || hasValidTagLivePage);

  const showBanner =
    !isEditoriallySensitive && hasValidElectionTag && electionBannerEnabled;

  if (!showBanner) return null;

  const bannerTitle = validAboutTag?.thingLabel ?? ELECTION_BANNER_TITLE;

  const {
    SIMORGH_APP_ENV,
    SIMORGH_INCLUDES_BASE_URL,
    SIMORGH_INCLUDES_BASE_AMP_URL,
  } = getEnvConfig();

  const iframeSrcToUse = SIMORGH_APP_ENV === 'live' ? iframeSrc : iframeDevSrc;
  const isAssocPress = Boolean(assocPressIframeSrc);
  const src =
    assocPressIframeSrc ||
    `${
      isAmp ? SIMORGH_INCLUDES_BASE_AMP_URL : SIMORGH_INCLUDES_BASE_URL
    }/${iframeSrcToUse}${isAmp ? '/amp' : ''}`;

  if (isAmp) {
    return (
      <div
        data-testid="election-banner"
        css={
          isAssocPress
            ? styles.assocPressElectionBannerWrapperAmp
            : styles.electionBannerWrapperAmp(DEFAULT_HEIGHTS_VJ)
        }
      >
        <AmpIframe
          ampMetadata={{
            ...(!isAssocPress && { imageWidth: 1 }),
            imageHeight: isAssocPress ? DEFAULT_HEIGHTS_AP.mobile : 1,
            src,
            image:
              'https://news.files.bbci.co.uk/include/vjassets/img/app-launcher.png',
            title: bannerTitle,
            ...(isAssocPress && { layout: 'fixed-height' as const }),
          }}
        />
      </div>
    );
  }

  return (
    <div
      data-testid="election-banner"
      css={
        isAssocPress
          ? styles.assocPressElectionBannerWrapper
          : styles.electionBannerWrapper
      }
    >
      <iframe
        {...(isAssocPress && { className: 'ap-embed' })}
        title={bannerTitle}
        src={src}
        scrolling="no"
        css={
          isAssocPress
            ? styles.assocPressElectionBannerIframe
            : styles.electionBannerIframe(DEFAULT_HEIGHTS_VJ)
        }
        {...(!isAssocPress && { height: DEFAULT_HEIGHTS_VJ.desktop })}
        width="100%"
      />
      {isAssocPress && (
        <Script
          src="https://interactives.apelections.org/election-results/assets/microsite/resizeClient.js"
          strategy="lazyOnload"
        />
      )}
    </div>
  );
}
