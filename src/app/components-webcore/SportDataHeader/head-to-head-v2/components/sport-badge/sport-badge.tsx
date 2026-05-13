import { getImage } from './badges-map';
import styles from '../index.styles';
import type { BadgePlaceholderFallbackType, BadgeSize } from '../../types';

const getTestId = (id?: string): string => {
  const urnId =
    String(id)?.match(/urn:bbc:sportsdata:football:team:(.+)/) || [];

  return urnId[1] || id || 'unknown';
};

interface SportBadgeProps {
  size: BadgeSize;
  id?: string;
  alt?: string;
  usePlaceholderFallback?: boolean;
  placeholderFallbackType?: BadgePlaceholderFallbackType;
  isConciseView?: boolean;
}

const SportBadge = ({
  size,
  id,
  alt = '',
  usePlaceholderFallback = true,
  placeholderFallbackType = 'badge',
}: SportBadgeProps) => {
  const testId = getTestId(id);
  const src = getImage({ id, usePlaceholderFallback, placeholderFallbackType });

  if (!src) return null;

  return (
    <div
      css={styles.badgeContainer(size)}
      data-testid={`badge-container-${testId}`}
    >
      {/* Empty alt string should hide images from assistive technology, but won't hide certain SVG contents in some browsers - e.g. Safari */}
      <img
        css={styles.badgeImage}
        alt={alt}
        data-testid={`badge-img-${testId}`}
        src={src}
        aria-hidden={!alt}
      />
    </div>
  );
};

export default SportBadge;
