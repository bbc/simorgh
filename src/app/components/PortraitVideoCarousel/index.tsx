import { use, useCallback, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useViewTracker from '#app/hooks/useViewTracker';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import SkipLinkWrapper from '#components/SkipLinkWrapper';
import styles from './index.module.scss';
import PortraitVideoModal from '../PortraitVideoModal';
import { BumpLoader } from '../MediaLoader';
import PortraitVideoPromo from './PortraitVideoPromo';
import PortraitCarouselNavigation from './PortraitVideoCarouselNavigation';
import Heading from '../Heading';
import PortraitVideoNoJs from './PortraitVideoNoJs';
import Subheading from '../Curation/Subhead';
import {
  isPlayablePortraitVideoBlock,
  PortraitVideoCarouselBlock,
} from './types';

type PortraitVideoCarouselProps = {
  title?: string;
  blocks: PortraitVideoCarouselBlock[];
  eventTrackingData: EventTrackingData;
  className?: string;
  backgroundColor?: string;
  link?: string;
  loadPlayerScripts?: boolean;
};

const PortraitVideoCarousel = ({
  title,
  blocks,
  eventTrackingData,
  className,
  backgroundColor,
  link,
  loadPlayerScripts = true,
}: PortraitVideoCarouselProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null,
  );

  const { isLite, isAmp, nonce } = use(RequestContext);
  const { translations } = use(ServiceContext);

  const { skipContent } = translations || {};
  const {
    text: skipLinkText = 'Skip %title% and continue',
    endTextVisuallyHidden = 'End of %title%',
  } = skipContent || {};

  const fallbackTitle = translations?.media?.video || 'Video';

  const isHydrated = useHydrationDetection();

  const eventTrackingDataExtended = {
    ...eventTrackingData,
    groupTracker: {
      ...eventTrackingData?.groupTracker,
      itemCount: blocks.length,
    },
  };

  const viewTracker = useViewTracker(eventTrackingDataExtended);

  const subheadingClickTracker = useClickTrackerHandler(eventTrackingData);
  const playableBlocks = useMemo(
    () => blocks.filter(isPlayablePortraitVideoBlock),
    [blocks],
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedVideoIndex(null);
  }, []);

  if (isLite || isAmp) return null;

  const handlePromoClick = (index: number) => {
    if (isPlayablePortraitVideoBlock(blocks[index])) {
      setSelectedVideoIndex(index);
      setIsModalOpen(true);
    }
  };

  const selectedPlayableVideoIndex =
    selectedVideoIndex === null
      ? -1
      : playableBlocks.findIndex(block => block === blocks[selectedVideoIndex]);

  return (
    <>
      {loadPlayerScripts && playableBlocks.length > 0 && (
        <BumpLoader nonce={nonce} />
      )}
      <section
        aria-label={title || translations.media.watch}
        role="region"
        data-testid="portrait-video-carousel"
        className={clsx(styles.section, className)}
        {...viewTracker}
      >
        <SkipLinkWrapper
          endTextId="end-of-portrait-video-carousel"
          text={skipLinkText}
          endTextVisuallyHidden={endTextVisuallyHidden}
          terms={{ '%title%': title || fallbackTitle }}
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
                className={styles.heading}
              >
                {title}
              </Heading>
            )
          )}
          <noscript>
            <PortraitVideoNoJs />
          </noscript>
          <div className={styles.carouselContainer}>
            <PortraitCarouselNavigation
              scrollPaneRef={scrollRef}
              backgroundColor={backgroundColor}
            />
            <ul
              ref={scrollRef}
              className={styles.carousel}
              data-testid="pv-carousel"
              tabIndex={-1}
              role="list"
            >
              {blocks.map((block, index) => (
                <PortraitVideoPromo
                  key={
                    isPlayablePortraitVideoBlock(block)
                      ? block.model.video.id
                      : block.model.video.articleUrl
                  }
                  block={block}
                  onClick={() => handlePromoClick(index)}
                  blockPosition={index}
                  eventTrackingData={eventTrackingDataExtended}
                  isHydrated={isHydrated}
                />
              ))}
            </ul>
          </div>
          {isModalOpen &&
            selectedPlayableVideoIndex >= 0 &&
            createPortal(
              <PortraitVideoModal
                blocks={playableBlocks}
                selectedVideoIndex={selectedPlayableVideoIndex}
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
