import { use } from 'react';
import clsx from 'clsx';
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
  preview?: ArticleEndPreview | null;
  className?: string;
};

const EndOfArticlePreview = ({ preview, className }: Props) => {
  const { translations, dir, service, datetimeLocale } = use(ServiceContext);
  const copy = translations.endOfArticlePreview;
  const eventTrackingData = {
    componentName: 'end-of-article-preview',
    groupTracker: { name: copy?.heading, type: 'next-article-preview' },
    ...(preview && {
      itemTracker: {
        type: 'next-article-preview',
        text: preview.title,
        resourceId: preview.id,
      },
    }),
  };
  const viewTracker = useViewTracker(eventTrackingData);
  const clickTracker = useClickTrackerHandler(eventTrackingData);

  if (!copy) return null;

  const published = preview?.firstPublished
    ? new Date(preview.firstPublished)
    : null;
  const hasPublishedDate = published && !Number.isNaN(published.getTime());
  const hasExcerpt = Boolean(preview?.paragraphs.length);
  const readTime = preview?.readTime ?? 0;
  const hasReadTime = Number.isFinite(readTime) && readTime > 0;

  return (
    <section
      id="end-of-article-preview"
      aria-labelledby="end-of-article-preview-heading"
      className={clsx(styles.section, className)}
      data-testid="end-of-article-preview"
      {...viewTracker}
    >
      <header className={styles.header}>
        <Paragraph size="greatPrimer" className={styles.endLabel}>
          {copy.endLabel}
        </Paragraph>
        <Heading
          level={2}
          size="trafalgar"
          className={styles.heading}
          id="end-of-article-preview-heading"
        >
          {copy.heading}
        </Heading>
        <Paragraph size="pica" className={styles.introduction}>
          {preview ? copy.introduction : copy.fallbackIntroduction}
        </Paragraph>
      </header>

      {preview ? (
        <article
          aria-labelledby="next-article-preview-title"
          className={styles.preview}
        >
          {preview.imageUrl && (
            <div className={styles.imageContainer}>
              <Image
                src={preview.imageUrl}
                alt={preview.imageAlt || ''}
                aspectRatio={[16, 9]}
                lazyLoad
                className={styles.image}
              />
              <span className={styles.imageLabel} aria-hidden="true">
                {copy.nextStory}
              </span>
            </div>
          )}
          <div
            className={clsx(
              styles.paper,
              preview.imageUrl && styles.paperWithImage,
            )}
          >
            <div className={styles.storyLabel}>
              <span>{copy.nextStory}</span>
              <span className={styles.relationship}>{copy.related}</span>
            </div>
            <Heading
              level={3}
              size="trafalgar"
              fontVariant="serifMedium"
              id="next-article-preview-title"
              className={styles.storyTitle}
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

            {hasExcerpt && (
              <div className={styles.excerpt}>
                <Paragraph size="brevier" className={styles.excerptLabel}>
                  {preview.excerptSource === 'summary'
                    ? copy.summaryLabel
                    : copy.previewLabel}
                </Paragraph>
                {preview.paragraphs.map(paragraph => (
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
                aria-describedby="next-article-preview-title"
                {...clickTracker}
              >
                <span>{copy.readFullStory}</span>
                <Chevron orientation={ChevronOrientation.FORWARD} dir={dir} />
              </a>
              {hasExcerpt && (
                <Paragraph size="brevier" className={styles.previewNote}>
                  {copy.previewNote}
                </Paragraph>
              )}
            </div>
          </div>
        </article>
      ) : (
        <a
          href={`https://www.bbc.com/${service}`}
          className={clsx(styles.readLink, styles.homepageLink)}
          {...clickTracker}
        >
          <span>{copy.homepage}</span>
          <Chevron orientation={ChevronOrientation.FORWARD} dir={dir} />
        </a>
      )}
    </section>
  );
};

export default EndOfArticlePreview;
