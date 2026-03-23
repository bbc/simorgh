import { use } from 'react';
import { Summary } from '#app/models/types/curationData';
import Promo from '#components/Promo';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { getBrandPath } from '#app/legacy/containers/Brand';
import styles from './index.styles';

type AttributionLink = {
  url: string;
  scheme?: string;
  host?: string;
  path?: string;
};

type Attribution = {
  link: AttributionLink;
  title: string;
};
export interface HighImpactPromoProps extends Summary {
  attributions?: Attribution[] | null;
  relatedTopic?: Attribution | null;
}

const HighImpactPromo = ({
  title,
  imageUrl,
  imageAlt,
  lazy,
  link,
  headingLevel = 3,
  eventTrackingData,
  attributions,
  relatedTopic,
}: HighImpactPromoProps) => {
  const { isAmp } = use(RequestContext);
  const { dir, service, brandName } = use(ServiceContext) || {};

  let subjectLink: string | undefined;
  let subjectText: string | undefined;
  if (relatedTopic?.link?.url && relatedTopic?.title) {
    subjectLink = relatedTopic.link.url;
    subjectText = relatedTopic.title;
  } else {
    subjectLink =
      attributions?.[0]?.link?.url ||
      (service ? getBrandPath(service) : undefined);
    subjectText = attributions?.[0]?.title || brandName;
  }
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
        {hasSubject && <div css={styles.divider} />}
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
