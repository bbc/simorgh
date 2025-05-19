/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PortraitVideoPromoProps } from '#app/models/types/portraitVideo';
import Image from '#app/components/Image';
import Text from '#app/components/Text';
import { Play } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import moment from 'moment';
import formatDuration from '#app/lib/utilities/formatDuration';
import { useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import styles from './index.styles';

export default (item: PortraitVideoPromoProps) => {
  const {
    id,
    images,
    headlines,
    video,
    onClick,
    itemPosition = 0,
    groupTracker,
  } = item;
  const { translations } = useContext(ServiceContext);

  const imageUrl = images?.[0]?.url;
  const alt = images?.[0]?.altText || '';
  const headline = headlines?.promoHeadline || '';
  const mediaISO8601Duration = video?.version.duration;
  const mediaType = 'video';

  const durationTranslation = translations?.media?.duration || 'Duration';
  let momentDuration = null;
  let durationString = '';
  let durationSpokenString = '';
  if (mediaISO8601Duration) {
    const separator = ':';
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

  const hiddenText = `${headline}, ${mediaType}, ${mediaISO8601Duration ? `${durationTranslation}  ${durationSpokenString}, ` : ''}Play ${mediaType}`;

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
    <button
      type="button"
      onClick={e => handleClick(e)}
      css={styles.button}
      {...viewTracker}
    >
      <div css={styles.gradientOverlay}>
        {mediaISO8601Duration && (
          <div css={styles.durationContainer} aria-hidden="true">
            <Play css={styles.playIcon} />
            <time>
              <Text size="brevier" css={styles.duration}>
                {durationString}
              </Text>
            </time>
          </div>
        )}
        <Text size="pica" as="p" fontVariant="sansBold" css={styles.title}>
          <VisuallyHiddenText>{hiddenText}</VisuallyHiddenText>
          <span aria-hidden="true">{headline}</span>
        </Text>
      </div>
      {imageUrl && (
        <Image alt={alt} src={imageUrl} css={styles.image} lazyLoad />
      )}
    </button>
  );
};
