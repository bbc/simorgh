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
import CallToActionLink from '#app/components/CallToActionLink';
import { Close } from '#app/components/icons';
import PortraitCarouselNavigation from '#app/components/PortraitVideoCarousel/PortraitVideoCarouselNavigation';
import styles from './index.module.scss';

type CarouselRecommendation = Omit<Recommendation, 'image'> & {
  image?: Recommendation['image'];
};

export type RecommendationsCarouselProps = {
  data: CarouselRecommendation[];
  stacked?: boolean;
};

const RecommendationImage = ({
  image,
  aspectRatio,
}: {
  image?: Recommendation['image'];
  aspectRatio?: [number, number];
}) => {
  const { defaultImage } = use(ServiceContext);
  const isPromo = Boolean(aspectRatio);
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
      className={isPromo ? styles.image : undefined}
      alt={isPromo ? '' : (image?.altText ?? '')}
      src={imageSources?.src ?? defaultImage}
      srcSet={imageSources?.primarySrcset}
      fallbackSrcSet={imageSources?.fallbackSrcset}
      sizes={
        isPromo
          ? '(min-width: 600px) 320px, (min-width: 360px) 56vw, 192px'
          : '(min-width: 600px) 600px, 100vw'
      }
      aspectRatio={aspectRatio ?? [image?.width ?? 16, image?.height ?? 9]}
      lazyLoad={isPromo}
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
        <CallToActionLink
          url={href}
          className={styles.continueReading}
          eventTrackingData={{
            ...eventTrackingData,
            componentName: 'article-recommendations-modal',
          }}
        >
          <CallToActionLink.Text shouldUnderlineOnHoverFocus>
            {translations.continueReading ?? title}
            <CallToActionLink.Chevron />
          </CallToActionLink.Text>
        </CallToActionLink>
      </div>
    </dialog>
  );
};

const RecommendationPromo = ({
  recommendation: { title, image },
  eventTrackingData,
  onSelect,
  square = false,
}: {
  recommendation: CarouselRecommendation;
  eventTrackingData: EventTrackingData;
  onSelect: () => void;
  square?: boolean;
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
        <RecommendationImage
          image={image}
          aspectRatio={square ? [1, 1] : [9, 16]}
        />
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
import { useRef } from 'react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import PortraitCarouselNavigation from '#app/components/PortraitVideoCarousel/PortraitVideoCarouselNavigation';
import RecommendationsImage from '#app/components/Recommendations/RecommendationsPromoImage';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { Recommendation } from '#app/models/types/onwardJourney';
import styles from './index.module.scss';

type RecommendationsCarouselProps = {
  data: Recommendation[];
  title: string;
  eventTrackingData: EventTrackingData;
};

const RecommendationCard = ({
  recommendation,
  eventTrackingData,
}: {
  recommendation: Recommendation;
  eventTrackingData: EventTrackingData;
}) => {
  const clickTracker = useClickTrackerHandler(eventTrackingData);

  return (
    <li className={styles.item}>
      <a
        className={styles.card}
        href={recommendation.href}
        onFocus={event =>
          event.currentTarget.scrollIntoView({
            block: 'nearest',
            inline: 'center',
          })
        }
        {...clickTracker}
      >
        <div className={styles.image}>
          <RecommendationsImage
            image={recommendation.image}
            aspectRatio={[9, 16]}
            sizes="(min-width: 600px) 25vw, 45vw"
            lazyLoad
          />
        </div>
        <Text size="pica" fontVariant="sansBold" className={styles.headline}>
          {recommendation.title}
        </Text>
      </a>
    </li>
  );
};

const RecommendationsCarousel = ({
  data,
  stacked = false,
}: RecommendationsCarouselProps) => {
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

  const renderPromo = (
    recommendation: CarouselRecommendation,
    index: number,
  ) => (
    <RecommendationPromo
      key={recommendation.id}
      recommendation={recommendation}
      square={stacked}
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
  );

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
          className={styles.heading}
        >
          {title}
        </Heading>
        <div className={styles.container}>
          <PortraitCarouselNavigation scrollPaneRef={scrollRef} />
          <ul ref={scrollRef} className={styles.carousel} role="list">
            {stacked
              ? Array.from(
                  { length: Math.ceil(data.length / 2) },
                  (_, columnIndex) => (
                    <li
                      className={styles.column}
                      key={data[columnIndex * 2].id}
                    >
                      <ul className={styles.stack} role="list">
                        {data
                          .slice(columnIndex * 2, columnIndex * 2 + 2)
                          .map((recommendation, rowIndex) =>
                            renderPromo(
                              recommendation,
                              columnIndex * 2 + rowIndex,
                            ),
                          )}
                      </ul>
                    </li>
                  ),
                )
              : data.map(renderPromo)}
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
  title,
  eventTrackingData,
}: RecommendationsCarouselProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const isHydrated = useHydrationDetection();
  const trackingData = {
    ...eventTrackingData,
    groupTracker: {
      ...eventTrackingData.groupTracker,
      itemCount: data.length,
    },
  };
  const viewTracker = useViewTracker(trackingData);

  return (
    <>
      <Heading
        level={2}
        size="doublePica"
        id="recommendations-heading"
        className={styles.heading}
      >
        {title}
      </Heading>
      <div className={styles.container}>
        {isHydrated && (
          <PortraitCarouselNavigation
            scrollPaneRef={scrollRef}
            backgroundColor="rgba(246, 246, 246, 0.75)"
          />
        )}
        <ul
          ref={scrollRef}
          className={styles.carousel}
          role="list"
          data-testid="recommendations-carousel"
          {...viewTracker}
        >
          {data.map((recommendation, index) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              eventTrackingData={{
                ...trackingData,
                itemTracker: {
                  type: 'midarticle-mostread-promo',
                  text: recommendation.title,
                  position: index + 1,
                },
              }}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default RecommendationsCarousel;
