import { use } from 'react';
import Script from 'next/script';
import clsx from 'clsx';
import { RequestContext } from '#app/contexts/RequestContext';
import AmpIframe from '#app/components/AmpIframe';
import useToggle from '#app/hooks/useToggle';
import { Tag } from '#app/components/Metadata/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import isLive from '#app/lib/utilities/isLive';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import { MetadataTaggings } from '#app/models/types/metadata';
import styles from './index.module.scss';

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

export const DEFAULT_HEIGHTS_VJ = {
  desktop: 350,
  tablet: 320,
  mobile: 315,
};

export const DEFAULT_HEIGHTS_AP = {
  desktop: 216,
  tablet: 400,
  mobile: 340,
};

export default function ElectionBanner({ aboutTags, taggings }: Props) {
  const { electionBanner } = use(ServiceContext);
  const { isAmp, isLite, pageType } = use(RequestContext);
  const { enabled: electionBannerEnabled }: ToggleType =
    useToggle('electionBanner');
  const isLivePage = pageType === LIVE_PAGE;

  if (isLive() || isLite || !electionBanner) return null;

  const {
    title,
    iframeSrc,
    iframeDevSrc,
    electionThingIds,
    assocPressIframeSrc,
  } = electionBanner;

  const isEditoriallySensitive = taggings?.some(({ value }) =>
    value.includes(SENSITIVE_ARTICLE_ID),
  );

  const hasValidTagLivePage = taggings?.some(({ value }) =>
    electionThingIds?.some(electionThingId => value.includes(electionThingId)),
  );

  const validAboutTag = aboutTags?.find(({ thingId }) =>
    electionThingIds?.includes(thingId),
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

  const hasTitle = isAssocPress && title;

  if (isAmp) {
    return (
      <div
        data-testid="election-banner"
        className={
          isAssocPress
            ? styles.assocPressElectionBannerWrapperAmp
            : styles.electionBannerWrapperAmp
        }
      >
        <div className={styles.electionBannerContent}>
          {hasTitle && <span className={styles.title}>{title}</span>}
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
      </div>
    );
  }

  return (
    <div
      {...(isLivePage && {
        className: styles.assocPressElectionBannerBackgroundLivePage,
      })}
    >
      <div
        data-testid="election-banner"
        className={clsx(
          isAssocPress
            ? styles.assocPressElectionBannerWrapper
            : styles.electionBannerWrapper,
          isLivePage &&
            (isAssocPress
              ? styles.assocPressElectionBannerWrapperLivePage
              : styles.electionBannerWrapperLive),
        )}
      >
        <div className={styles.electionBannerContent}>
          {hasTitle && !isLivePage && (
            <span className={styles.title}>{title}</span>
          )}
          <iframe
            className={clsx(
              isAssocPress && 'ap-embed',
              isAssocPress
                ? styles.assocPressElectionBannerIframe
                : styles.electionBannerIframe,
              isLivePage &&
                isAssocPress &&
                styles.assocPressElectionBannerIframeLivePage,
            )}
            title={bannerTitle}
            src={src}
            scrolling="no"
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
      </div>
    </div>
  );
}
