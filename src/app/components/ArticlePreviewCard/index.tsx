import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import Image from '#app/components/Image';
import { Chevron, ChevronOrientation } from '#app/components/icons';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import type { ArticleEndPreview } from './types';
import styles from './index.module.scss';

type Props = {
  preview: ArticleEndPreview;
  id: string;
};

const ArticlePreviewCard = ({ preview, id }: Props) => {
  const { translations, dir, datetimeLocale } = use(ServiceContext);
  const copy = translations.endOfArticlePreview;
  const titleId = `${id}-title`;
  const eventTrackingData = {
    componentName: 'article-preview-card',
    groupTracker: { name: copy?.nextStory, type: 'next-article-preview' },
    itemTracker: {
      type: 'article-preview',
      text: preview.title,
      resourceId: preview.id,
      link: preview.href,
    },
  };
  const viewTracker = useViewTracker({
    ...eventTrackingData,
    viewTrackerKey: preview.id,
  });
  const clickTracker = useClickTrackerHandler(eventTrackingData);

  if (!copy) return null;

  const published = preview.firstPublished
    ? new Date(preview.firstPublished)
    : null;
  const hasPublishedDate = published && !Number.isNaN(published.getTime());
  const readTime = preview.readTime ?? 0;
  const hasReadTime = Number.isFinite(readTime) && readTime > 0;
  const paragraphs = preview.paragraphs
    .filter(paragraph => paragraph.trim().length > 0)
    .slice(0, 2);
  const hasExcerpt = paragraphs.length > 0;

  return (
    <article
      id={id}
      aria-labelledby={titleId}
      className={styles.card}
      data-testid="article-preview-card"
      {...viewTracker}
    >
      <header className={styles.header}>
        {preview.imageUrl && (
          <div className={styles.imageContainer}>
            <Image
              src={preview.imageUrl}
              alt={preview.imageAlt || ''}
              lazyLoad
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.headingArea}>
          <div className={styles.storyLabel}>
            <span>{copy.nextStory}</span>
            <span className={styles.relationship}>{copy.related}</span>
          </div>
          <Heading
            level={3}
            size="doublePica"
            fontVariant="serifMedium"
            id={titleId}
            className={styles.title}
          >
            {preview.title}
          </Heading>
          {(hasPublishedDate || hasReadTime) && (
            <div className={styles.metadata}>
              {hasPublishedDate && (
                <time dateTime={published.toISOString()}>
                  {new Intl.DateTimeFormat(datetimeLocale, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    timeZone: 'UTC',
                  }).format(published)}
                </time>
              )}
              {hasReadTime && (
                <span>
                  {copy.readTime.replace(
                    '{minutes}',
                    String(Math.ceil(readTime)),
                  )}
                </span>
              )}
            </div>
          )}
        </div>
      </header>
      <div className={styles.paper}>
        {hasExcerpt && (
          <div className={styles.excerpt}>
            <Paragraph size="brevier" className={styles.excerptLabel}>
              {preview.excerptSource === 'summary'
                ? copy.summaryLabel
                : copy.previewLabel}
            </Paragraph>
            {paragraphs.map(paragraph => (
              <Paragraph
                key={paragraph}
                size="bodyCopy"
                className={styles.excerptParagraph}
              >
                {paragraph}
              </Paragraph>
            ))}
          </div>
        )}

        <div className={styles.actionArea}>
          <a
            href={preview.href}
            className={styles.readLink}
            aria-describedby={titleId}
            {...clickTracker}
          >
            <span>{copy.readFullStory}</span>
            <Chevron
              orientation={ChevronOrientation.FORWARD}
              dir={dir}
              className={styles.chevron}
            />
          </a>
          {hasExcerpt && (
            <Paragraph size="brevier" className={styles.previewNote}>
              {copy.previewNote}
            </Paragraph>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticlePreviewCard;
