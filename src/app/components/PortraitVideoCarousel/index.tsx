import { use, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useViewTracker from '#app/hooks/useViewTracker';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import styles from './index.styles';
import PortraitVideoModal from '../PortraitVideoModal';
import { BumpLoader } from '../MediaLoader';
import PortraitVideoPromo from './PortraitVideoPromo';
import PortraitCarouselNavigation from './PortraitVideoCarouselNavigation';
import Heading from '../Heading';
import PortraitVideoNoJs from './PortraitVideoNoJs';
import { PortraitClipMediaBlock } from '../MediaLoader/types';
import Subheading from '../Curation/Subhead';
import SkipLinkWrapper from '#components/SkipLinkWrapper';

type PortraitVideoCarouselProps = {
  title?: string;
  blocks: PortraitClipMediaBlock[];
  eventTrackingData: EventTrackingData;
  className?: string;
  backgroundColor?: string;
  link?: string;
};

const PortraitVideoCarousel = ({
  title,
  blocks,
  eventTrackingData,
  className,
  backgroundColor,
  link,
}: PortraitVideoCarouselProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null,
  );

  const { isLite, isAmp, nonce } = use(RequestContext);
  const { translations } = use(ServiceContext);

  const isHydrated = useHydrationDetection();

  // EXPERIMENT: Homepage Portrait Video 2
  const playDurationExperimentName = 'newswb_ws_homepage_portrait_video';
  const playDurationVariation =
    useOptimizelyVariation({
      experimentName: playDurationExperimentName,
      experimentType: ExperimentType.CLIENT_SIDE,
    }) ?? undefined;

  const eventTrackingDataExtended = {
    ...eventTrackingData,
    groupTracker: {
      ...eventTrackingData?.groupTracker,
      itemCount: blocks.length,
    },
    ...(playDurationVariation && {
      sendOptimizelyEvents: true,
      experimentName: playDurationExperimentName,
      experimentVariation: playDurationVariation,
    }),
  };

  const viewTracker = useViewTracker(eventTrackingDataExtended);

  const subheadingClickTracker = useClickTrackerHandler(eventTrackingData);

  if (isLite || isAmp) return null;

  const handlePromoClick = (index: number) => {
    if (blocks?.[index]?.model?.video) {
      setSelectedVideoIndex(index);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideoIndex(null);
  };

  return (
    <>
      <BumpLoader nonce={nonce} />
      <section
        aria-label={title || translations.media.watch}
        role="region"
        data-testid="portrait-video-carousel"
        css={styles.section}
        className={className}
        {...viewTracker}
      >
        <SkipLinkWrapper
          endTextId="end-of-portrait-video-carousel"
          text="Skip %title% and continue reading"
          endTextVisuallyHidden="End of %title%"
          terms={{ '%title%': title || 'Portrait Video Carousel' }}
        >
          {link && title ? (
            <Subheading link={link} {...subheadingClickTracker}>
              {title}
            </Subheading>
          ) : (
            title && (
              <Heading
                level={2}
                size="doublePica"
                fontVariant="sansBold"
                css={styles.heading}
              >
                {title}
              </Heading>
            )
          )}
          <noscript>
            <PortraitVideoNoJs />
          </noscript>
          <div css={styles.carouselContainer}>
            <PortraitCarouselNavigation
              scrollPaneRef={scrollRef}
              backgroundColor={backgroundColor}
            />
            <ul
              ref={scrollRef}
              css={styles.carousel}
              data-testid="pv-carousel"
              tabIndex={-1}
              role="list"
            >
              {blocks.map((block, index) => (
                <PortraitVideoPromo
                  key={block?.model?.video?.id}
                  block={block}
                  onClick={() => handlePromoClick(index)}
                  blockPosition={index}
                  eventTrackingData={eventTrackingDataExtended}
                  playDurationVariation={playDurationVariation}
                  isHydrated={isHydrated}
                />
              ))}
            </ul>
          </div>
          {isModalOpen &&
            selectedVideoIndex !== null &&
            createPortal(
              <PortraitVideoModal
                blocks={blocks}
                selectedVideoIndex={selectedVideoIndex}
                onClose={handleCloseModal}
                nonce={nonce}
                eventTrackingData={eventTrackingDataExtended}
              />,
              document.body,
            )}
        </SkipLinkWrapper>
      </section>
    </>
  );
};

export default PortraitVideoCarousel;
