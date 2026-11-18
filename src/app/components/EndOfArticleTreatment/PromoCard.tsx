import { use } from 'react';
import moment from 'moment';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Heading from '#app/components/Heading';
import Image from '#app/components/Image';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import formatDuration from '#app/lib/utilities/formatDuration';
import InlineMedia from './InlineMedia';
import { ArticleEndItem } from './types';
import styles from './index.module.scss';

type Props = {
  item: ArticleEndItem;
  showPlayer: boolean;
};

const PromoCard = ({ item, showPlayer }: Props) => {
  const { translations } = use(ServiceContext);
  const copy = translations.endOfArticleTreatment;
  if (!copy) return null;
  const duration =
    typeof item.duration === 'string' && item.duration.startsWith('P')
      ? moment.duration(item.duration)
      : moment.duration(Number(item.duration || 0), 'seconds');
  const formattedDuration =
    Number.isFinite(duration.asSeconds()) && duration.asSeconds() > 0
      ? formatDuration({ duration })
      : null;
  const destinationLabels: Partial<Record<ArticleEndItem['format'], string>> = {
    article: copy.readArticle,
    topic: copy.exploreTopic,
  };
  const destinationLabel = destinationLabels[item.format] || copy.openContent;

  return (
    <div className={styles.card}>
      <div className={styles.mediaFrame}>
        {showPlayer && item.media ? (
          <InlineMedia
            mediaBlock={item.media}
            loadingMessage={copy.loadingMedia}
            unavailableMessage={copy.unavailableMedia}
          />
        ) : (
          <div className={styles.artwork} data-format={item.format}>
            {item.imageUrl && (
              <Image
                src={item.imageUrl.replace('{width}', '800')}
                alt=""
                lazyLoad
                placeholder={false}
              />
            )}
            {(item.format === 'topic' || !item.imageUrl) && (
              <div
                className={styles.topicArtwork}
                data-has-image={Boolean(item.imageUrl)}
                aria-hidden="true"
              >
                {item.format === 'topic' ? item.title : copy.heading}
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        <span className={styles.format}>
          {copy.formats[item.format]}
          {formattedDuration && ` · ${formattedDuration}`}
        </span>
        <Heading level={3} size="doublePica" className={styles.title}>
          {item.title}
        </Heading>
        <p className={styles.description}>{item.relationship}</p>
        {item.description && (
          <p className={styles.description}>{item.description}</p>
        )}
        <div className={styles.actions}>
          <a href={item.href} className={styles.action}>
            {destinationLabel}
            <VisuallyHiddenText>: {item.title}</VisuallyHiddenText>
            <span aria-hidden="true">&nbsp;↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
