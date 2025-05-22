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
import styles from './index.styles';

const DEFAULT_TRANSLATION = {
  video: 'video',
  watch: 'Watch',
  duration: 'Duration',
};
export default (item: PortraitVideoPromoProps) => {
  const { images, headlines, video, onClick } = item;
  const {
    translations: { media = DEFAULT_TRANSLATION },
  } = useContext(ServiceContext);

  const imageUrl = images?.[0]?.url;
  const alt = images?.[0]?.altText || '';
  const headline = headlines?.promoHeadline || '';
  const mediaISO8601Duration = video?.version.duration;
  const {
    video: mediaType,
    watch: actionType,
    duration: durationTranslation,
  } = media;

  let durationString = '';
  let durationSpokenString = '';
  if (mediaISO8601Duration) {
    const separator = ',';
    const momentDuration = moment.duration(mediaISO8601Duration, 'seconds');
    durationString = formatDuration({
      duration: momentDuration,
      padMinutes: true,
    });
    durationSpokenString = formatDuration({
      duration: momentDuration,
      separator,
    });
  }

  return (
    <div css={styles.container}>
      {imageUrl && (
        <Image alt={alt} src={imageUrl} aspectRatio={[9, 16]} lazyLoad />
      )}
      <button type="button" onClick={onClick} css={styles.button}>
        <div css={styles.gradientOverlay}>
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
      </button>
    </div>
  );
};
