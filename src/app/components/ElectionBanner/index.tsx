import { use } from 'react';
import Script from 'next/script';
import clsx from 'clsx';
import { RequestContext } from '#app/contexts/RequestContext';
import AmpIframe from '#app/components/AmpIframe';
import { Tag } from '#app/components/Metadata/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import isLive from '#app/lib/utilities/isLive';
import styles from './index.module.scss';

// Consumers (e.g. the Live, Home and Topic pages) own any page-specific style
// overrides and pass them in here, rather than this component branching on
// which page it's rendered on.
type OverrideClassnames = {
  wrapper?: string;
  assocPressWrapper?: string;
  iframe?: string;
  title?: string;
};

type Props = {
  aboutTags?: Tag[];
  overrideClassnames?: OverrideClassnames;
};

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

// Callers decide editorial visibility via isElectionBannerVisible; this guards
// the isLite/isLive runtime cases so every consumer doesn't have to repeat them.
export default function ElectionBanner({
  aboutTags,
  overrideClassnames,
}: Props) {
  const { electionBanner } = use(ServiceContext);
  const { isAmp, isLite } = use(RequestContext);

  if (!electionBanner || isLive() || isLite) return null;

  const {
    title,
    iframeSrc,
    iframeDevSrc,
    electionThingIds,
    assocPressIframeSrc,
  } = electionBanner;

  const validAboutTag = aboutTags?.find(({ thingId }) =>
    electionThingIds?.includes(thingId),
  );

  const bannerTitle =
    validAboutTag?.thingLabel || title || ELECTION_BANNER_TITLE;

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
          {hasTitle && (
            <span className={clsx(styles.title, overrideClassnames?.title)}>
              {title}
            </span>
          )}
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
      data-testid="election-banner"
      className={clsx(
        isAssocPress
          ? styles.assocPressElectionBannerWrapper
          : styles.electionBannerWrapper,
        isAssocPress
          ? overrideClassnames?.assocPressWrapper
          : overrideClassnames?.wrapper,
      )}
    >
      <div className={styles.electionBannerContent}>
        {hasTitle && (
          <span className={clsx(styles.title, overrideClassnames?.title)}>
            {title}
          </span>
        )}
        <iframe
          className={clsx(
            isAssocPress && 'ap-embed',
            isAssocPress
              ? styles.assocPressElectionBannerIframe
              : styles.electionBannerIframe,
            overrideClassnames?.iframe,
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
  );
}
