import { use } from 'react';
import clsx from 'clsx';
import { RequestContext } from '#app/contexts/RequestContext';
import { ExternalSvg } from '..';
import styles from './index.module.scss';

type MediaIconName =
  | 'video'
  | 'audio'
  | 'photogallery'
  | 'guidance'
  | 'podcast'
  | 'communication'
  | 'elections'
  | 'youtube'
  | 'whatsapp'
  | 'seriesstack';

type Props = {
  name: MediaIconName;
  className: string;
  width: string;
  height: string;
};

const MediaIcon = ({ name, className, width, height }: Props) => {
  const { isLite } = use(RequestContext);

  return (
    <ExternalSvg
      name={`media-${name}`}
      className={clsx(styles.icon, styles.media, className)}
      width={width}
      height={height}
      useCurrentColor
      inheritFallbackDimensions
      loading="eager"
      data-is-lite={name === 'video' ? isLite : undefined}
    />
  );
};

const mediaIcons = {
  video: (
    <MediaIcon name="video" className={styles.video} width="12" height="12" />
  ),
  audio: (
    <MediaIcon name="audio" className={styles.audio} width="12" height="12" />
  ),
  photogallery: (
    <MediaIcon
      name="photogallery"
      className={styles.photogallery}
      width="16"
      height="13"
    />
  ),
  guidance: (
    <MediaIcon
      name="guidance"
      className={styles.square}
      width="16"
      height="16"
    />
  ),
  podcast: (
    <MediaIcon name="podcast" className={styles.promo} width="16" height="16" />
  ),
  communication: (
    <MediaIcon
      name="communication"
      className={styles.promo}
      width="16"
      height="16"
    />
  ),
  elections: (
    <MediaIcon
      name="elections"
      className={styles.promo}
      width="16"
      height="16"
    />
  ),
  youtube: (
    <MediaIcon name="youtube" className={styles.promo} width="16" height="16" />
  ),
  whatsapp: (
    <MediaIcon
      name="whatsapp"
      className={styles.promo}
      width="16"
      height="16"
    />
  ),
  seriesstack: (
    <MediaIcon
      name="seriesstack"
      className={styles.square}
      width="16"
      height="16"
    />
  ),
};

export default mediaIcons;
