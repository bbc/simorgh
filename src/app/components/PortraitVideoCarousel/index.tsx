import { use, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { RequestContext } from '#app/contexts/RequestContext';
import useViewTracker from '#app/hooks/useViewTracker';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import styles from './index.styles';
import PortraitVideoModal from '../PortraitVideoModal';
import { BumpLoader } from '../MediaLoader';
import PortraitVideoPromo from './PortraitVideoPromo';
import PortraitCarouselNavigation from './PortraitVideoCarouselNavigation';
import Heading from '../Heading';
import PortraitVideoNoJs from './PortraitVideoNoJs';
import { PortraitClipMediaBlock } from '../MediaLoader/types';
import VideoOverlay from '../VideoOverlay';

type PortraitVideoCarouselProps = {
  title: string;
  blocks: PortraitClipMediaBlock[];
  eventTrackingData: EventTrackingData;
};

const PortraitVideoCarousel = ({
  title,
  blocks,
  eventTrackingData,
}: PortraitVideoCarouselProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null,
  );
  const [hasShareApi, setHasShareApi] = useState(true);
  // const [videoOverlayContainer, setVideoOverlayContainer] = useState();
  const [overlayReady, setOverlayReady] = useState(false);
  const videoOverlayContainerRef = useRef<HTMLElement | null>(null);
  const setVideoOverlayContainer = (el: HTMLElement) => {
    if (!videoOverlayContainerRef.current) {
      videoOverlayContainerRef.current = el;
      setOverlayReady(true);
    }
  };

  useEffect(() => {
    if ('share' in navigator) {
      setHasShareApi(true);
    }
  }, []);

  const { isLite, nonce } = use(RequestContext);

  const eventTrackingDataExtended = {
    ...eventTrackingData,
    groupTracker: {
      ...eventTrackingData?.groupTracker,
      itemCount: blocks.length,
    },
  };

  const viewTracker = useViewTracker(eventTrackingDataExtended);

  if (isLite) return null;

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

  console.log('CONTAINER VID ', videoOverlayContainerRef.current);

  return (
    <>
      <BumpLoader nonce={nonce} />
      <section
        aria-label={title}
        role="region"
        data-testid="portrait-video-carousel"
        css={styles.section}
        {...viewTracker}
      >
        <Heading
          level={2}
          size="doublePica"
          fontVariant="sansBold"
          css={styles.heading}
        >
          {title}
        </Heading>
        <noscript>
          <PortraitVideoNoJs />
        </noscript>
        <div css={styles.carouselContainer}>
          <PortraitCarouselNavigation scrollPaneRef={scrollRef} />
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
              setVideoOverlayContainer={setVideoOverlayContainer}
            />,
            document.body,
          )}
        {overlayReady &&
          videoOverlayContainerRef.current &&
          createPortal(
            <VideoOverlay
              blocks={blocks}
              selectedVideoIndex={selectedVideoIndex}
              hasShareApi={hasShareApi}
            />,
            videoOverlayContainerRef.current,
          )}
      </section>
    </>
  );
};

export default PortraitVideoCarousel;
