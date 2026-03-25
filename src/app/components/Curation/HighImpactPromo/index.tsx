import { use } from 'react';
import { Summary } from '#app/models/types/curationData';
import Promo from '#components/Promo';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { getBrandPath } from '#app/legacy/containers/Brand';
import styles from './index.styles';

type RelatedTopicLink = {
  url: string;
  scheme?: string;
  host?: string;
  path?: string;
};

type RelatedTopic = {
  link: RelatedTopicLink;
  title: string;
};
export interface HighImpactPromoProps extends Summary {
  relatedTopic?: RelatedTopic | null;
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
}: HighImpactPromoProps) => {
  const { isAmp } = use(RequestContext);
  const { dir, service, brandName } = use(ServiceContext) || {};

  const subjectLink =
    relatedTopic?.link?.url || (service ? getBrandPath(service) : undefined);
  const subjectText = relatedTopic?.title || brandName;
  const hasSubject = Boolean(subjectLink && subjectText);

  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

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
        {hasSubject && (
          <Promo.A
            href={subjectLink}
            css={styles.subject}
            {...clickTrackerHandler}
          >
            {subjectText}
          </Promo.A>
        )}
      </div>
    </div>
  );
};

export default HighImpactPromo;
