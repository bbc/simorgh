import { use } from 'react';
import { filter, last, pathOr, pipe } from 'ramda';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import Heading from '#app/components/Heading';
import { OptimoBlock } from '#app/models/types/optimo';
import mapRelatedContentData from './transformers';
import styles from './index.module.scss';

interface RelatedContentCarouselItem {
  id: string;
  title: string;
  url: string;
  image?: string;
}

interface RelatedContentCarouselProps {
  content: OptimoBlock[];
}

const BLOCKS_TO_IGNORE = ['wsoj', 'mpu'];

const removeCustomBlocks = pipe(
  filter((block: OptimoBlock) => !BLOCKS_TO_IGNORE.includes(block.type)),
  last,
);

const RelatedContentCarousel = ({ content }: RelatedContentCarouselProps) => {
  const { translations } = use(ServiceContext);
  const { enabled: isCarouselEnabled } = useToggle('relatedContentCarousel');

  const title = pathOr('Related Content', ['relatedContent'], translations);

  const relatedContentBlock = removeCustomBlocks(content) as OptimoBlock;

  const items = mapRelatedContentData(
    relatedContentBlock,
  ) as RelatedContentCarouselItem[];

  if (!items || items.length === 0) return null;

  return (
    <section
      className={`${styles.container} ${isCarouselEnabled ? styles.carouselTheme : ''}`}
      aria-labelledby="related-content-heading"
    >
      <Heading
        id="related-content-heading"
        level={2}
        className={styles.heading}
      >
        {title}
      </Heading>

      {isCarouselEnabled ? (
        <ul
          className={styles.carouselList}
          data-testid="portrait-video-carousel"
          role="region"
          aria-label={title}
        >
          {items.map(item => (
            <li key={item.id} className={styles.carouselItem}>
              <div className={styles.card}>
                <a href={item.url} className={styles.link}>
                  <div className={styles.imageContainer}>
                    {item.image && (
                      <img src={item.image} alt="" className={styles.image} />
                    )}
                  </div>
                  <span className={styles.cardTitle}>{item.title}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.grid}>
          {items.map(item => (
            <div key={item.id} className={styles.gridCard}>
              <a href={item.url} className={styles.gridLink}>
                {item.image && (
                  <div className={styles.gridImageContainer}>
                    <img src={item.image} alt="" className={styles.gridImage} />
                  </div>
                )}
                <span className={styles.gridCardTitle}>{item.title}</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RelatedContentCarousel;
