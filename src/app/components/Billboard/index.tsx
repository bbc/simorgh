import { use } from 'react';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { Summary, VISUAL_PROMINENCE } from '#app/models/types/curationData';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import Image from '#app/components/Image';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import { createSrcsets } from '#app/lib/utilities/srcSet';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#app/lib/utilities/imageSrcHelpers/locator';
import Heading from '../Heading';
import MaskedImage from '../MaskedImage';
import styles from './index.styles';
import Text from '../Text';
import LivePulse from '../LivePulse';
import LiveText from '../LiveText';
import { ServiceContext } from '../../contexts/ServiceContext';
import BillboardCurationGrid from './BillboardCurationGrid';

type BillboardProminence =
  | typeof VISUAL_PROMINENCE.HIGH
  | typeof VISUAL_PROMINENCE.MAXIMUM
  | string;

interface BillboardProps {
  heading: string;
  description: string;
  link: string;
  image: string;
  altText: string;
  id?: string;
  prominence?: BillboardProminence;
  eventTrackingData?: EventTrackingData;
  showLiveLabel?: boolean;
  summaries?: Summary[];
}

const IMAGE_WIDTH = 660;
const DEFAULT_IMAGE_RES = 480;

// 2x retina ceiling for the fixed 660px desktop display slot, with extra rungs
// between 800 and the retina ceiling to avoid large overshoot/waste for
// devices that don't need the full retina resolution.
const IMAGE_WIDTH_RETINA = IMAGE_WIDTH * 2;
const IMAGE_RESOLUTIONS = [240, 320, 480, 624, 800, 1000, IMAGE_WIDTH_RETINA];

export default ({
  heading,
  description,
  link,
  image,
  altText,
  id = 'billboard',
  prominence = VISUAL_PROMINENCE.MAXIMUM,
  showLiveLabel,
  eventTrackingData = { componentName: 'billboard' },
  summaries = [],
}: BillboardProps) => {
  const { translations } = use(ServiceContext);
  const showMoreOnThisTitle = translations.moreOnThis;
  const hasPromoItems = summaries.length > 1;
  const isSingleImageLayout = !hasPromoItems;
  const isHighProminence = prominence === VISUAL_PROMINENCE.HIGH;

  const eventTrackingDataWithOptimizelyEvents = {
    ...eventTrackingData,
  };

  const viewTracker = useViewTracker(eventTrackingDataWithOptimizelyEvents);
  const clickTrackerHandler = useClickTrackerHandler(
    eventTrackingDataWithOptimizelyEvents,
  );

  const renderImage = () => {
    if (!isHighProminence) {
      return (
        <MaskedImage
          imageUrl={image.replace('{width}', '240')}
          imageUrlTemplate={image}
          altText={altText}
          imageWidth={IMAGE_WIDTH}
          showPlaceholder={false}
          showVignette={hasPromoItems}
          singleImageLayout={isSingleImageLayout}
        />
      );
    }

    const url = image.split('{width}')[1];
    const originCode = getOriginCode(url);
    const locator = getLocator(url);
    const desktopSrcsets = createSrcsets({
      originCode,
      locator,
      originalImageWidth: IMAGE_WIDTH_RETINA,
      imageResolutions: IMAGE_RESOLUTIONS,
    });
    const compactSrcsets = createSrcsets({
      originCode,
      locator,
      originalImageWidth: 800,
    });
    const srcWebp = buildIChefURL({
      originCode,
      locator,
      resolution: DEFAULT_IMAGE_RES,
    });

    // Breakpoint-scoped art direction: each <source>'s `media` condition is
    // evaluated by the browser before it considers device pixel ratio, so a
    // mobile/tablet viewport can never reach the desktop-only retina (1320w)
    // candidate, regardless of its DPR.
    const breakpointSources = [
      {
        media: '(min-width: 1280px)',
        srcSet: desktopSrcsets.primarySrcset || '',
        fallbackSrcSet: desktopSrcsets.fallbackSrcset || '',
        sizes: '660px',
      },
      {
        media: '(min-width: 1008px)',
        srcSet: compactSrcsets.primarySrcset || '',
        fallbackSrcSet: compactSrcsets.fallbackSrcset || '',
        sizes: '50vw',
      },
      {
        srcSet: compactSrcsets.primarySrcset || '',
        fallbackSrcSet: compactSrcsets.fallbackSrcset || '',
        sizes: '100vw',
      },
    ];

    return (
      <div css={styles.imageContainer}>
        <Image
          alt={altText}
          src={srcWebp}
          srcSet={compactSrcsets.primarySrcset || undefined}
          fallbackSrcSet={compactSrcsets.fallbackSrcset || undefined}
          mediaType={compactSrcsets.primaryMimeType || undefined}
          fallbackMediaType={compactSrcsets.fallbackMimeType || undefined}
          sizes="(min-width: 1280px) 660px, (min-width: 1008px) 50vw, 100vw"
          breakpointSources={breakpointSources}
          width={800}
          height={533}
          placeholder={false}
          fetchPriority="high"
          preload
        />
      </div>
    );
  };

  return (
    <section role="region" aria-labelledby={id} data-testid={id}>
      <div css={styles.headerContainer} {...viewTracker}>
        <div
          css={[
            styles.backgroundContainer,
            isHighProminence
              ? styles.backgroundPlainBlack
              : styles.backgroundRedGradient,
          ]}
        />
        <div
          css={[
            styles.contentContainer,
            hasPromoItems && styles.contentContainerWithPromos,
          ]}
        >
          <div css={[isHighProminence && styles.highProminenceRow]}>
            {renderImage()}
            <div
              css={[
                styles.textContainer,
                isHighProminence && styles.textContainerHighProminence,
              ]}
            >
              <Heading level={2} size="paragon" css={styles.heading} id={id}>
                <a href={link} css={styles.link} {...clickTrackerHandler}>
                  {showLiveLabel ? (
                    <div data-testid="billboard-live-label">
                      <LivePulse
                        width="24"
                        height="24"
                        css={styles.liveLabelPulse}
                      />
                      <LiveText css={styles.liveLabelText}>
                        <div>{heading}</div>
                      </LiveText>
                    </div>
                  ) : (
                    <div>{heading}</div>
                  )}
                </a>
              </Heading>
              {description && (
                <Text as="p" css={styles.description}>
                  {description}
                </Text>
              )}
            </div>
          </div>
          {hasPromoItems && (
            <div css={styles.curationGridSection}>
              {showMoreOnThisTitle && (
                <Heading
                  level={2}
                  size="greatPrimer"
                  css={[styles.billboardMoreOnThisHeading]}
                >
                  {showMoreOnThisTitle}
                </Heading>
              )}

              <BillboardCurationGrid
                summaries={summaries.slice(1)}
                eventTrackingData={eventTrackingData}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
