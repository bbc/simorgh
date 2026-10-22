import { useTheme } from '@emotion/react';
import Image from '#app/components/Image';
import Text from '#app/components/Text';
import { Play } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import moment from 'moment';
import formatDuration from '#app/lib/utilities/formatDuration';
import { use, FocusEvent, MouseEvent } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import {
  createResponsiveSrcSet,
  MULTILINE_SRCSET_SEPARATOR,
} from '#app/utilities/imageSrcSets';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import styles from './index.module.scss';
import {
  isPlayablePortraitVideoBlock,
  PortraitVideoCarouselBlock,
} from '../types';

const DEFAULT_TRANSLATION = {
  video: 'video',
  play: 'Play',
  duration: 'Duration',
};

type PortraitVideoPromoProps = {
  block: PortraitVideoCarouselBlock;
  eventTrackingData: EventTrackingData;
  isHydrated?: boolean;
  blockPosition?: number;
  onClick?: () => void;
};

export default ({
  block,
  blockPosition = 0,
  eventTrackingData,
  onClick,
  isHydrated,
}: PortraitVideoPromoProps) => {
  const { mq } = useTheme();
  const {
    defaultImage,
    defaultImageAltText,
    translations: { media = DEFAULT_TRANSLATION },
  } = use(ServiceContext);
  const { pageType } = use(RequestContext);

  const { images, video } = block.model;
  const isPlayable = isPlayablePortraitVideoBlock(block);
  const articleUrl = isPlayable ? undefined : block.model.video.articleUrl;

  const imageUrl = images?.[0]?.source ?? defaultImage;
  const imageUrlTemplate = images?.[0]?.urlTemplate;
  const alt = images?.[0]?.altText || defaultImageAltText;
  const headline = video?.title || '';
  const mediaISO8601Duration = video?.version?.duration;

  const {
    video: mediaType,
    play: actionType,
    duration: durationTranslation,
  } = media;

  let momentDuration: moment.Duration | null = null;
  let durationString = '';
  let durationSpokenString = '';
  if (mediaISO8601Duration) {
    const separator = ',';
    momentDuration = moment.duration(mediaISO8601Duration, 'seconds');
    durationString = formatDuration({
      duration: momentDuration,
      padMinutes: true,
    });
    durationSpokenString = formatDuration({
      duration: momentDuration,
      separator,
    });
  }

  const onFocusListener = (event: FocusEvent<HTMLElement>) => {
    event.target.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const srcSets = createResponsiveSrcSet({
    imageUrlTemplate,
    mq,
    imageWidthSmall: 64,
    imageWidthLarge: 256,
    srcSetSeparator: MULTILINE_SRCSET_SEPARATOR,
  });

  const fallbackSrcSets = createResponsiveSrcSet({
    imageUrlTemplate: imageUrlTemplate?.replace('.webp', ''),
    mq,
    imageWidthSmall: 64,
    imageWidthLarge: 256,
    srcSetSeparator: MULTILINE_SRCSET_SEPARATOR,
  });

  const eventTrackingDataExtended = {
    ...eventTrackingData,
    viewThreshold: 1,
    itemTracker: {
      type: pageType === LIVE_PAGE ? 'portrait-video' : 'portrait-video-promo',
      text: headline,
      position: blockPosition + 1,
      resourceId: isPlayable ? block.model.video.id : articleUrl,
      ...(momentDuration && { duration: momentDuration.asMilliseconds() }),
    },
  };

  const viewTracker = useViewTracker(eventTrackingDataExtended);

  const { onClick: clickTrackerHandler } =
    useClickTrackerHandler(eventTrackingDataExtended) ?? {};

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (clickTrackerHandler) clickTrackerHandler(event);
    if (onClick) onClick();
  };

  const promoContent = (
    <div className={styles.gradientOverlay}>
      <div className={styles.textWrapper}>
        {mediaISO8601Duration && (
          <div className={styles.durationContainer} aria-hidden="true">
            <Play className={styles.playIcon} />
            <time dateTime={mediaISO8601Duration}>
              <Text size="brevier" className={styles.duration}>
                {durationString}
              </Text>
            </time>
          </div>
        )}
        <Text
          size="pica"
          fontVariant="sansBold"
          className={styles.title}
          data-testid="text-contents"
        >
          <VisuallyHiddenText>
            {isPlayable && `${actionType} `}
            {mediaType},{' '}
          </VisuallyHiddenText>
          <span>{headline}</span>
          {mediaISO8601Duration && (
            <VisuallyHiddenText>
              , {durationTranslation} {durationSpokenString}
            </VisuallyHiddenText>
          )}
        </Text>
      </div>
    </div>
  );

  return (
    <li
      className={styles.container}
      style={isHydrated ? { scrollSnapAlign: 'start' } : undefined}
    >
      <Image
        alt={alt}
        src={imageUrl}
        aspectRatio={[9, 16]}
        srcSet={srcSets?.srcSet}
        fallbackSrcSet={fallbackSrcSets?.srcSet}
        sizes={srcSets?.sizes}
        lazyLoad
      />
      {articleUrl ? (
        <a
          href={articleUrl}
          className={styles.interactive}
          onFocus={onFocusListener}
          onClick={handleClick}
          {...viewTracker}
          data-testid="promo-link"
        >
          {promoContent}
        </a>
      ) : (
        <button
          type="button"
          className={styles.interactive}
          onFocus={onFocusListener}
          onClick={handleClick}
          {...viewTracker}
          data-testid="promo-button"
        >
          {promoContent}
        </button>
      )}
    </li>
  );
};
