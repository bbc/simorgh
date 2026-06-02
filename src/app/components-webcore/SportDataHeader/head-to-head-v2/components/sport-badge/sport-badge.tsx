import styles from '../../index.styles';
import type { BadgePlaceholderFallbackType, BadgeSize } from '../../types';

const getTestId = (id?: string): string => {
  const urnId =
    String(id)?.match(/urn:bbc:sportsdata:football:team:(.+)/) || [];

  return urnId[1] || id || 'unknown';
};

interface SportBadgeProps {
  size: BadgeSize;
  urn: string;
  src?: string;
  alt?: string;
  usePlaceholderFallback?: boolean;
  placeholderFallbackType?: BadgePlaceholderFallbackType;
  isConciseView?: boolean;
}

const SportBadge = ({ urn, size, src, alt = '' }: SportBadgeProps) => {
  const testId = getTestId(urn);

  if (!src) return null;

  return (
    <div
      css={styles.badgeContainer(size)}
      data-testid={`badge-container-${testId}`}
    >
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
