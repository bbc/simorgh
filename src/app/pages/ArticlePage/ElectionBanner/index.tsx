import { use } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import AmpIframe from '#app/components/AmpIframe';
import useToggle from '#app/hooks/useToggle';
import { Tag } from '#app/components/Metadata/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { MetadataTaggings } from '#app/models/types/metadata';
import styles from './index.styles';

type Props = {
  aboutTags: Tag[];
  taggings: MetadataTaggings;
};

type ToggleType = {
  enabled: boolean | null;
  value: string | null;
};

const DEFAULT_HEIGHTS_VJ = {
  desktop: 350,
  tablet: 320,
  mobile: 315,
};

const DEFAULT_HEIGHTS_AP = {
  desktop: 216,
  tablet: 216,
  mobile: 315,
};

const SENSITIVE_ARTICLE_ID = 'f2b5dd0e-dda0-454c-893d-792d46ff48c3';

export default function ElectionBanner({ aboutTags, taggings }: Props) {
  const { electionBanner } = use(ServiceContext);
  const { isAmp, isLite } = use(RequestContext);
  const { enabled: electionBannerEnabled }: ToggleType =
    useToggle('electionBanner');

  if (isLite || !electionBanner) return null;

  const {
    // @ts-expect-error - need to type
    heightsAp = DEFAULT_HEIGHTS_AP,
    // @ts-expect-error - need to type
    heightsVj = DEFAULT_HEIGHTS_VJ,
    iframeSrc,
    iframeDevSrc,
    electionThingIds,
    assocPressIframeSrc,
  } = electionBanner;

  const isEditoriallySensitive = taggings?.some(({ value }) =>
    value.includes(SENSITIVE_ARTICLE_ID),
  );

  const validAboutTag = aboutTags?.find(({ thingId }) =>
    electionThingIds.includes(thingId),
  );

  const showBanner =
    !isEditoriallySensitive && validAboutTag && electionBannerEnabled;

  if (!showBanner) return null;

  const {
    SIMORGH_APP_ENV,
    SIMORGH_INCLUDES_BASE_URL,
    SIMORGH_INCLUDES_BASE_AMP_URL,
  } = getEnvConfig();

  if (assocPressIframeSrc && isAmp) {
    return (
      <div
        data-testid="election-banner"
        // not minheight
        css={styles.electionBannerWrapperAmp(heightsAp)}
      >
        <AmpIframe
          ampMetadata={{
            imageWidth: 1,
            imageHeight: 1,
            // might need /amp
            src: `https://interactives.apelections.org/election-results/customers/layouts/organization-layouts/published/108620/33021.html`,
            image:
              'https://news.files.bbci.co.uk/include/vjassets/img/app-launcher.png',
            title: validAboutTag.thingLabel,
          }}
        />
        {/* // not sure if this will work */}
        {/* <script
          defer
          src="https://interactives.apelections.org/election-results/assets/microsite/resizeClient.js"
        /> */}
      </div>
    );
  }

  if (assocPressIframeSrc && !isAmp) {
    return (
      <div
        data-testid="election-banner"
        css={styles.electionBannerWrapper}
        // css={[styles.electionBannerWrapper, styles.electionBannerIframe(heights)]}
      >
        <iframe
          className="ap-embed" // needed for script
          title={validAboutTag.thingLabel}
          // title="Live election results via the Associated Press"
          // loading="lazy"
          src={assocPressIframeSrc}
          scrolling="no"
          // css={styles.electionBannerIframe(heights)}
          css={styles.electionBannerIframeExtra(heightsAp)} // minHeights
          height={heightsAp.desktop}
          width="100%"
          // frameBorder="0"
          // marginHeight="0"
        />
        <script
          defer
          src="https://interactives.apelections.org/election-results/assets/microsite/resizeClient.js"
        />
      </div>
    );
  }

  const iframeSrcToUse = SIMORGH_APP_ENV === 'live' ? iframeSrc : iframeDevSrc;

  if (isAmp) {
    return (
      <div
        data-testid="election-banner"
        css={styles.electionBannerWrapperAmp(heightsVj)}
      >
        <AmpIframe
          ampMetadata={{
            imageWidth: 1,
            imageHeight: 1,
            src: `${SIMORGH_INCLUDES_BASE_AMP_URL}/${iframeSrcToUse}/amp`,
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
        src={`${SIMORGH_INCLUDES_BASE_URL}/${iframeSrcToUse}`}
        scrolling="no"
        css={styles.electionBannerIframe(heightsVj)}
        height={heightsVj.desktop}
        width="100%"
      />
    </div>
  );
}
