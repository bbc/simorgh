/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { useContext } from 'react';
import Heading from '../Heading';
import Paragraph from '../Paragraph';
import styles from './index.styles';
import { ServiceContext } from '../../contexts/ServiceContext';

interface PortraitVideoItem {
  id: string;
  images?: { url: string; altText?: string }[];
  headlines?: { promoHeadline?: string };
  link?: { path: string };
}

interface PortraitVideoCarouselProps {
  title: string;
  items: PortraitVideoItem[];
}

const PortraitVideoCarousel = ({
  title,
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
      <Heading level={2} size="doublePica" css={styles.heading(theme)}>
        {title}
      </Heading>
      <div dir={dir} css={styles.scrollWrapper(theme)}>
        {items.map(item => {
          const image = item.images?.[0]?.url;
          const alt = item.images?.[0]?.altText || '';
          const headline = item.headlines?.promoHeadline || '';
          const href = item.link?.path || '#';

          return (
            <a
              key={item.id}
              href={href}
              css={styles.promoItem(theme)}
              className="portrait-video-promo"
            >
              {image && (
                <img
                  src={image}
                  alt={alt}
                  css={styles.image(theme)}
                  loading="lazy"
                />
              )}
              <Paragraph size="longPrimer" css={styles.headline(theme)}>
                {headline}
              </Paragraph>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default PortraitVideoCarousel;
