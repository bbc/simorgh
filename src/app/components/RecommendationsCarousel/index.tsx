import { use, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Recommendation } from '#app/models/types/onwardJourney';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { createIchefSrcSet } from '#app/utilities/imageSrcSets';
import SkipLinkWrapper from '#components/SkipLinkWrapper';
import Heading from '#app/components/Heading';
import Image from '#app/components/Image';
import Text from '#app/components/Text';
import InlineLink from '#app/components/InlineLink';
import { Close } from '#app/components/icons';
import PortraitCarouselNavigation from '#app/components/PortraitVideoCarousel/PortraitVideoCarouselNavigation';
import styles from './index.module.scss';

type CarouselRecommendation = Omit<Recommendation, 'image'> & {
  image?: Recommendation['image'];
};

type Props = {
  data: CarouselRecommendation[];
};

const RecommendationImage = ({
  image,
  portrait = false,
}: {
  image?: Recommendation['image'];
  portrait?: boolean;
}) => {
  const { defaultImage } = use(ServiceContext);
  const imageSources = image
    ? createIchefSrcSet({
        originCode: image.originCode,
        locator: image.locator,
        originalImageWidth: image.width,
        imageResolutions: [144, 240, 320, 480, 660],
        srcResolution: 320,
      })
    : undefined;

  return (
    <Image
      className={portrait ? styles.image : undefined}
      alt={portrait ? '' : (image?.altText ?? '')}
      src={imageSources?.src ?? defaultImage}
      srcSet={imageSources?.primarySrcset}
      fallbackSrcSet={imageSources?.fallbackSrcset}
      sizes={
        portrait
          ? '(min-width: 600px) 240px, 45vw'
          : '(min-width: 600px) 600px, 100vw'
      }
      aspectRatio={
        portrait ? [9, 16] : [image?.width ?? 16, image?.height ?? 9]
      }
      lazyLoad={portrait}
    />
  );
};

const RecommendationModal = ({
  recommendation: { title, href, image },
  onClose,
  eventTrackingData,
}: {
  recommendation: CarouselRecommendation;
  onClose: () => void;
  eventTrackingData: EventTrackingData;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { translations } = use(ServiceContext);
  const viewTracker = useViewTracker({
    ...eventTrackingData,
    componentName: 'article-recommendations-modal',
    alwaysInView: true,
  });
  const clickTracker = useClickTrackerHandler({
    ...eventTrackingData,
    componentName: 'article-recommendations-modal',
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    dialog?.showModal();
    return () => {
      dialog?.close();
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-labelledby="recommendations-modal-heading"
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
    >
      <button
        className={styles.closeButton}
        type="button"
        aria-label={translations.media.closeVideo}
        onClick={onClose}
      >
        <Close className={styles.closeIcon} />
      </button>
      <RecommendationImage image={image} />
      <div className={styles.modalContent} {...viewTracker}>
        <Heading level={2} size="doublePica" id="recommendations-modal-heading">
          {title}
        </Heading>
        <InlineLink
          to={href}
          text={translations.continueReading ?? title}
          size="pica"
          {...clickTracker}
        />
      </div>
    </dialog>
  );
};

const RecommendationPromo = ({
  recommendation: { title, image },
  eventTrackingData,
  onSelect,
}: {
  recommendation: CarouselRecommendation;
  eventTrackingData: EventTrackingData;
  onSelect: () => void;
}) => {
  const clickTracker = useClickTrackerHandler(eventTrackingData);
  const viewTracker = useViewTracker(eventTrackingData);

  return (
    <li className={styles.item} {...viewTracker}>
      <button
        className={styles.promo}
        type="button"
        aria-haspopup="dialog"
        onFocus={event =>
          event.currentTarget.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
          })
        }
        onClick={event => {
          clickTracker?.onClick?.(event);
          onSelect();
        }}
      >
        <RecommendationImage image={image} portrait />
        <div className={styles.overlay}>
          <Text
            as="span"
            size="pica"
            fontVariant="sansBold"
            className={styles.title}
          >
            {title}
          </Text>
        </div>
      </button>
    </li>
  );
};

const RecommendationsCarousel = ({ data }: Props) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeModal = useCallback(() => setSelectedIndex(null), []);
  const { service, recommendations } = use(ServiceContext);
  const { env, pageType, isAmp, isLite, isApp } = use(RequestContext);
  const title = recommendations?.header;
  const eventTrackingData = {
    componentName: 'article-recommendations-carousel',
    groupTracker: {
      name: title,
      type: 'article-recommendations-carousel',
      itemCount: data.length,
    },
  };
  const viewTracker = useViewTracker(eventTrackingData);
  const selectedRecommendation =
    selectedIndex !== null ? data[selectedIndex] : undefined;

  if (
    service !== 'mundo' ||
    (env !== 'local' && env !== 'test') ||
    pageType !== ARTICLE_PAGE ||
    isAmp ||
    isLite ||
    isApp ||
    !data.length ||
    !title ||
    !recommendations?.skipLink
  ) {
    return null;
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="recommendations-carousel-heading"
      data-testid="recommendations-carousel"
      {...viewTracker}
    >
      <SkipLinkWrapper
        endTextId="end-of-recommendations-carousel"
        terms={{ '%title%': title }}
        {...recommendations.skipLink}
      >
        <Heading
          level={2}
          size="doublePica"
          id="recommendations-carousel-heading"
        >
          {title}
        </Heading>
        <div className={styles.container}>
          <PortraitCarouselNavigation scrollPaneRef={scrollRef} />
          <ul ref={scrollRef} className={styles.carousel} role="list">
            {data.map((recommendation, index) => (
              <RecommendationPromo
                key={recommendation.id}
                recommendation={recommendation}
                onSelect={() => setSelectedIndex(index)}
                eventTrackingData={{
                  ...eventTrackingData,
                  itemTracker: {
                    type: 'article-recommendations-promo',
                    text: recommendation.title,
                    position: index + 1,
                    resourceId: recommendation.id,
                  },
                }}
              />
            ))}
          </ul>
        </div>
      </SkipLinkWrapper>
      {selectedRecommendation &&
        createPortal(
          <RecommendationModal
            recommendation={selectedRecommendation}
            onClose={closeModal}
            eventTrackingData={{
              ...eventTrackingData,
              itemTracker: {
                type: 'article-recommendations-promo',
                text: selectedRecommendation.title,
                position: (selectedIndex ?? 0) + 1,
                resourceId: selectedRecommendation.id,
              },
            }}
          />,
          document.body,
        )}
    </section>
  );
};

export default RecommendationsCarousel;
