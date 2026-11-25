import { use, useId } from 'react';
import moment from 'moment';
import Heading from '#app/components/Heading';
import Image from '#app/components/Image';
import InlineLink from '#app/components/InlineLink';
import Text from '#app/components/Text';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { navigationIcons } from '#app/components/icons/shared';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import formatDuration from '#app/lib/utilities/formatDuration';
import { LatestMedia } from '#app/pages/MediaArticlePage/PagePromoSections/LatestMediaSection/types';
import styles from './index.module.scss';

const MAX_PROMOS = 3;

type PortraitVideoEndScreenPromoProps = {
  item: LatestMedia;
  itemCount: number;
  position: number;
};

type PortraitVideoEndScreenProps = {
  content: LatestMedia[];
  currentArticleId?: string;
  onClose: () => void;
};

const getDuration = (duration?: string) => {
  if (!duration) return null;

  return formatDuration({
    duration: moment.duration(duration),
  });
};

const getIdVariants = (id?: string) =>
  id ? [id, id.split(':').pop(), id.split('/').pop()] : [];

const PortraitVideoEndScreenPromo = ({
  item,
  itemCount,
  position,
}: PortraitVideoEndScreenPromoProps) => {
  const eventTrackingData = {
    componentName: 'portrait-video-end-screen',
    groupTracker: {
      itemCount,
    },
    itemTracker: {
      type: 'portrait-video-end-screen-promo',
      text: item.title,
      position,
      resourceId: item.id,
      ...(item.duration && {
        duration: moment.duration(item.duration).asMilliseconds(),
      }),
    },
  };

  const viewTracker = useViewTracker({
    ...eventTrackingData,
    viewThreshold: 1,
  });

  const { onClick: clickTrackerHandler } =
    useClickTrackerHandler(eventTrackingData) ?? {};

  const duration = getDuration(item.duration);
  const imageSource = item.imageUrl.replace('{width}', '240');

  return (
    <li {...viewTracker} className={styles.item}>
      <InlineLink
        to={item.link}
        className={`${styles.link} focusIndicatorInvert`}
        onClick={clickTrackerHandler}
      >
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            alt={item.imageAlt ?? ''}
            src={imageSource}
          />
        </div>
        <span className={styles.content}>
          <Text
            as="span"
            size="pica"
            fontVariant="sansBold"
            className={styles.title}
          >
            {item.title}
          </Text>
          {duration && (
            <Text as="span" size="brevier" className={styles.duration}>
              <time dateTime={item.duration}>{duration}</time>
            </Text>
          )}
        </span>
      </InlineLink>
    </li>
  );
};

const PortraitVideoEndScreen = ({
  content,
  currentArticleId,
  onClose,
}: PortraitVideoEndScreenProps) => {
  const { translations } = use(ServiceContext);
  const headingId = useId();
  const currentArticleIds = new Set(getIdVariants(currentArticleId));

  const promos = content
    .filter(item => item.type === 'video' && !currentArticleIds.has(item.id))
    .slice(0, MAX_PROMOS);

  if (promos.length === 0) return null;

  const heading = translations?.latestMediaTitle ?? 'Latest';
  const closeLabel =
    translations?.media?.endOfContentClose ?? 'End of content. Close';

  return (
    <section
      className={styles.overlay}
      data-testid="portrait-video-end-screen"
      aria-labelledby={headingId}
      role="region"
    >
      <button
        type="button"
        className={`${styles.closeButton} focusIndicatorInvert`}
        onClick={onClose}
        data-testid="portrait-video-end-screen-close"
        aria-label={closeLabel}
      >
        {navigationIcons.cross}
        <VisuallyHiddenText>{closeLabel}</VisuallyHiddenText>
      </button>
      <div className={styles.contentWrapper}>
        <Heading level={2} id={headingId} className={styles.heading}>
          {heading}
        </Heading>
        <ul className={styles.list}>
          {promos.map((item, index) => (
            <PortraitVideoEndScreenPromo
              key={item.id}
              item={item}
              itemCount={promos.length}
              position={index + 1}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PortraitVideoEndScreen;
