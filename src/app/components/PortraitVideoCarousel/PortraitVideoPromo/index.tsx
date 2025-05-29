/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { PortraitVideoPromoProps } from '#app/models/types/portraitVideo';
import Image from '#app/components/Image';
import Text from '#app/components/Text';
import { Play } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import moment from 'moment';
import formatDuration from '#app/lib/utilities/formatDuration';
import { useContext, FocusEvent } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import getSrcSets from '#app/utilities/getSrcSets';
import styles from './index.styles';

const DEFAULT_TRANSLATION = {
  video: 'video',
  play: 'Play',
  duration: 'Duration',
};
export default (item: PortraitVideoPromoProps) => {
  const { mq } = useTheme();
  const {
    id,
    images,
    headlines,
    video,
    onClick,
    itemPosition = 0,
    groupTracker,
  } = item;
  const {
    defaultImage,
    defaultImageAltText,
    translations: { media = DEFAULT_TRANSLATION },
  } = useContext(ServiceContext);

  const imageUrl = images?.[0]?.url ?? defaultImage;
  const imageUrlTemplate = images?.[0]?.urlTemplate;
  const alt = images?.[0]?.altText || defaultImageAltText;
  const headline = headlines?.promoHeadline || '';
  const mediaISO8601Duration = video?.version.duration;
  const {
    video: mediaType,
    play: actionType,
    duration: durationTranslation,
  } = media;
  let momentDuration = null;
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

  const adjustedItemPosition = itemPosition + 1;
  const eventTrackingData = {
    componentName: `portrait-video-promo-${adjustedItemPosition}`,
    groupTracker,
    itemTracker: {
      type: 'portrait-video-promo',
      text: headline,
      position: adjustedItemPosition,
      ...(momentDuration && { duration: momentDuration.asSeconds() }),
      resourceId: id,
    },
  };

  const viewTracker = useViewTracker(eventTrackingData);
  const { onClick: clickTrackerHandler } =
    useClickTrackerHandler(eventTrackingData);

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (clickTrackerHandler) {
      clickTrackerHandler(e);
    }
    if (onClick) onClick();
  };

  return (
    <li css={styles.container}>
      <Image
        alt={alt}
        src={imageUrl}
        aspectRatio={[9, 16]}
        srcSet={srcSets?.srcSet}
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
          <div css={styles.forcedColourBackground}>
            {mediaISO8601Duration && (
              <div css={styles.durationContainer} aria-hidden="true">
                <Play css={styles.playIcon} />
                <time dateTime={mediaISO8601Duration}>
                  <Text size="brevier" css={styles.duration}>
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
