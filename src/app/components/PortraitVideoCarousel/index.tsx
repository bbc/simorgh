/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { useContext } from 'react';
import Heading from '../Heading';
import styles from './index.styles';
import { ServiceContext } from '../../contexts/ServiceContext';
import CallToActionLink from '../CallToActionLink';
import { RightChevron } from '../icons';

interface PortraitVideoItem {
  id: string;
  images?: { url: string; altText?: string }[];
  headlines?: { promoHeadline?: string };
  link?: { path: string };
}

interface PortraitVideoCarouselProps {
  title: string;
  titleUrl?: string;
  items: PortraitVideoItem[];
}

const PortraitVideoCarousel = ({
  title,
  titleUrl,
  items,
}: PortraitVideoCarouselProps) => {
  const theme = useTheme();
  const { dir } = useContext(ServiceContext);

  return (
    <section
      aria-label={title}
      role="region"
      data-testid="portrait-video-carousel"
      css={styles.section(theme)}
    >
      {titleUrl ? (
        <CallToActionLink
          href={titleUrl}
          css={styles.ctaLink(theme)}
          className="focusIndicatorInvert"
        >
          <Heading level={2} size="doublePica" css={styles.heading}>
            {title}
          </Heading>
          <RightChevron css={styles.chevron} />
        </CallToActionLink>
      ) : (
        <Heading level={2} size="doublePica" css={styles.heading}>
          {title}
        </Heading>
      )}

      <div dir={dir} css={styles.scrollWrapper(theme)}>
        {items.map(item => {
          const image = item.images?.[0]?.url;
          const alt = item.images?.[0]?.altText || '';
          const headline = item.headlines?.promoHeadline || '';
          const href = item.link?.path || '#';

          return (
            <div key={item.id} css={styles.promoItem}>
              {image && (
                <img src={image} alt={alt} css={styles.image} loading="lazy" />
              )}
              <Heading level={3} size="longPrimer" css={styles.promoHeading}>
                <a href={href} css={styles.promoLink(theme)}>
                  {headline}
                </a>
              </Heading>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PortraitVideoCarousel;
