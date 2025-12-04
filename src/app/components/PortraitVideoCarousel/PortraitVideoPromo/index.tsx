import { useTheme } from '@emotion/react';
import Image from '#app/components/Image';
import Text from '#app/components/Text';
import { Play } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import moment from 'moment';
import formatDuration from '#app/lib/utilities/formatDuration';
import { use, FocusEvent } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import getSrcSets from '#app/utilities/getSrcSets';
import { PortraitClipMediaBlock } from '#app/components/MediaLoader/types';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import styles from './index.styles';

const DEFAULT_TRANSLATION = {
  video: 'video',
  play: 'Play',
  duration: 'Duration',
};

type PortraitVideoPromoProps = {
  block: PortraitClipMediaBlock;
  eventTrackingData: EventTrackingData;
  blockPosition?: number;
  timeOfDayVariant?: string;
  // EXPERIMENT: Portrait Video Homepage Play Duration Sizing
  playDurationVariation?: string;
  onClick?: () => void;
};

export default ({
  block,
  blockPosition = 0,
  eventTrackingData,
  onClick,
  timeOfDayVariant,
  // EXPERIMENT: Portrait Video Homepage Play Duration Sizing
  playDurationVariation,
}: PortraitVideoPromoProps) => {
  const { mq } = useTheme();
  const {
    defaultImage,
    defaultImageAltText,
    translations: { media = DEFAULT_TRANSLATION },
  } = use(ServiceContext);

  const { images, video } = block.model;
  // EXPERIMENT: Portrait Video Homepage Play Duration Sizing
  const isLargeVariation = playDurationVariation === 'large';

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

  const onFocusListener = (event: FocusEvent<HTMLButtonElement>) => {
    event.target.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const srcSets = getSrcSets({
    imageUrlTemplate,
    mq,
    imageWidthSmall: 64,
    imageWidthLarge: 256,
  });

  const fallbackSrcSets = getSrcSets({
    imageUrlTemplate: imageUrlTemplate?.replace('.webp', ''),
    mq,
    imageWidthSmall: 64,
    imageWidthLarge: 256,
  });

  const eventTrackingDataExtended = {
    ...eventTrackingData,
    ...(timeOfDayVariant && {
      sendOptimizelyEvents: true,
      experimentName: 'newswb_ws_tod_homepage',
      experimentVariant: timeOfDayVariant,
    }),
    // EXPERIMENT: Portrait Video Homepage Play Duration Sizing
    ...(playDurationVariation && {
      sendOptimizelyEvents: true,
      experimentName: 'newswb_ws_play_and_duration_size_increase',
      experimentVariant: playDurationVariation,
    }),
    viewThreshold: 1,
    itemTracker: {
      type: 'portrait-video-promo',
      text: headline,
      position: blockPosition + 1,
      resourceId: video?.id,
      ...(momentDuration && { duration: momentDuration.asMilliseconds() }),
    },
  };

  const viewTracker = useViewTracker(eventTrackingDataExtended);

  const { onClick: clickTrackerHandler } =
    useClickTrackerHandler(eventTrackingDataExtended) ?? {};

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (clickTrackerHandler) clickTrackerHandler(e);
    if (onClick) onClick();
  };

  return (
    <li css={styles.container}>
      <Image
        alt={alt}
        src={imageUrl}
        aspectRatio={[9, 16]}
        srcSet={srcSets?.srcSet}
        fallbackSrcSet={fallbackSrcSets?.srcSet}
        sizes={srcSets?.sizes}
        lazyLoad
      />
      <button
        type="button"
        css={styles.button}
        onFocus={onFocusListener}
        onClick={e => handleClick(e)}
        {...viewTracker}
        data-testid="promo-button"
      >
        <div css={styles.gradientOverlay}>
          <div css={styles.textWrapper}>
            {mediaISO8601Duration && (
              <div css={styles.durationContainer} aria-hidden="true">
                <Play
                  css={
                    // EXPERIMENT: Portrait Video Homepage Play Duration Sizing
                    isLargeVariation ? styles.playIconLarge : styles.playIcon
                  }
                />
                <time dateTime={mediaISO8601Duration}>
                  <Text
                    // EXPERIMENT: Portrait Video Homepage Play Duration Sizing
                    size={isLargeVariation ? 'pica' : 'brevier'}
                    css={styles.duration}
                  >
                    {durationString}
                  </Text>
                </time>
              </div>
            )}
            <Text
              size="pica"
              fontVariant="sansBold"
              css={styles.title}
              data-testid="text-contents"
            >
              <VisuallyHiddenText>
                {actionType} {mediaType},{' '}
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
      </button>
    </li>
  );
};
