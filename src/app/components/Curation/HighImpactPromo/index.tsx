import { use } from 'react';
import { Summary, RelatedTopic } from '#app/models/types/curationData';
import Promo from '#components/Promo';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { getBrandPath } from '#app/legacy/containers/Brand';
import styles from './index.styles';

export interface HighImpactPromoProps extends Summary {
  relatedTopic?: RelatedTopic | null;
  showRelatedTopic?: boolean;
}

const HighImpactPromo = ({
  title,
  imageUrl,
  imageAlt,
  lazy,
  link,
  headingLevel = 3,
  eventTrackingData,
  relatedTopic,
  showRelatedTopic,
}: HighImpactPromoProps) => {
  const { isAmp } = use(RequestContext);
  const { dir, service, brandName } = use(ServiceContext) || {};

  const relatedTopicToShow = showRelatedTopic ? relatedTopic : null;
  const subjectLink =
    relatedTopicToShow?.link?.url ||
    (service ? getBrandPath(service) : undefined);
  const subjectText = relatedTopicToShow?.title || brandName;
  const hasSubject = Boolean(subjectLink && subjectText);

  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);
  const relatedTopicClickTrackerHandler = useClickTrackerHandler({
    ...eventTrackingData,
    itemTracker: {
      ...eventTrackingData?.itemTracker,
      type: 'simple-curation-grid-related-topic',
      text: subjectText,
    },
  });
  const subjectClickTrackerHandler = relatedTopicToShow
    ? relatedTopicClickTrackerHandler
    : clickTrackerHandler;

  return (
    <div data-testid="high-impact-promo" css={styles.promo} dir={dir}>
      {imageUrl && (
        <div css={styles.imageContainer}>
          <Promo.Image
            src={imageUrl}
            alt={imageAlt}
            lazyLoad={lazy}
            isAmp={isAmp}
          />
        </div>
      )}
      <div css={styles.content}>
        <Promo.Heading as={`h${headingLevel}`} css={styles.heading}>
          <Promo.A
            href={link}
            css={styles.headingLink}
            {...clickTrackerHandler}
          >
            {title}
          </Promo.A>
        </Promo.Heading>
        {hasSubject && <div css={styles.divider} />}
        {hasSubject && (
          <Promo.A
            href={subjectLink}
            css={styles.subject}
            {...subjectClickTrackerHandler}
          >
            {subjectText}
          </Promo.A>
        )}
      </div>
    </div>
  );
};

export default HighImpactPromo;
