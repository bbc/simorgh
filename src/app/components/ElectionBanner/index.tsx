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
import { MetadataTaggings } from '#app/models/types/metadata';
import styles from './index.module.scss';

type Props = {
  className?: string;
  aboutTags?: Tag[];
  taggings?: MetadataTaggings;
  curationIds?: string[];
};

type ToggleType = {
  enabled: boolean | null;
  value: string | null;
};

const SENSITIVE_ARTICLE_ID = 'f2b5dd0e-dda0-454c-893d-792d46ff48c3';

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

export default function ElectionBanner({
  className,
  aboutTags,
  taggings,
  curationIds,
}: Props) {
  const { electionBanner } = use(ServiceContext);
  const { isAmp, isLite, pageType } = use(RequestContext);
  const { enabled: electionBannerEnabled }: ToggleType =
    useToggle('electionBanner');

  const isHomePage = pageType === 'home';
  const isCollectionPage = ['home', 'topic'].includes(pageType);

  if (
    isLite ||
    !electionBanner ||
    (isCollectionPage && !electionBanner.assocPressIframeSrc) ||
    (isLive() && !isCollectionPage)
  )
    return null;

  const {
    title,
    iframeSrc,
    iframeDevSrc,
    electionThingIds,
    electionCurationIds,
    assocPressIframeSrc,
  } = electionBanner;

  const isEditoriallySensitive = taggings?.some(({ value }) =>
    value.includes(SENSITIVE_ARTICLE_ID),
  );

  const validAboutTag = aboutTags?.find(({ thingId }) =>
    electionThingIds?.includes(thingId),
  );

  const isEligibleTopic =
    pageType === 'topic' &&
    curationIds?.some(curationId => electionCurationIds?.includes(curationId));

  const isEligibleArticle = Boolean(validAboutTag);

  const isEligiblePage = isHomePage || isEligibleTopic || isEligibleArticle;

  const showBanner =
    !isEditoriallySensitive && isEligiblePage && electionBannerEnabled;

  if (!showBanner) return null;

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

  const hasTitle = isAssocPress && title && pageType !== 'topic';
  const iframeTitle = validAboutTag?.thingLabel || title;

  if (isAmp) {
    return (
      <div
        data-testid="election-banner"
        className={clsx(
          isAssocPress
            ? styles.assocPressElectionBannerWrapperAmp
            : styles.electionBannerWrapperAmp,
          className,
        )}
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
              title: iframeTitle,
              ...(isAssocPress && { layout: 'fixed-height' as const }),
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="election-banner"
      className={clsx(
        isAssocPress
          ? styles.assocPressElectionBannerWrapper
          : styles.electionBannerWrapper,
        className,
      )}
    >
      <div className={styles.electionBannerContent}>
        {hasTitle && <span className={styles.title}>{title}</span>}
        <iframe
          className={clsx(
            isAssocPress && 'ap-embed',
            isAssocPress
              ? styles.assocPressElectionBannerIframe
              : styles.electionBannerIframe,
          )}
          title={iframeTitle}
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
  );
}
