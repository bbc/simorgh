import { use } from 'react';
import pathOr from 'ramda/src/pathOr';
import { Summary } from '#app/models/types/curationData';
import Promo from '#components/Promo';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { getBrandPath } from '#app/legacy/containers/Brand';
import getTopicPageUrl from '#app/utilities/getTopicPageUrl';
import styles from './index.styles';

type Attribution = {
  link: string;
  text: string;
};
export interface HighImpactPromoProps extends Summary {
  attribution?: Attribution;
}

const HighImpactPromo = ({
  title,
  imageUrl,
  imageAlt,
  lazy,
  link,
  headingLevel = 3,
  eventTrackingData,
  attribution,
  primaryTopic,
}: HighImpactPromoProps) => {
  const { isAmp, variant } = use(RequestContext);
  const { dir, service, brandName, translations } = use(ServiceContext) || {};

  const topicsPath = pathOr('topics', ['topicsPath'], translations);

  // Use primaryTopic for attribution if available, otherwise fall back to default attribution
  const attributionLink = primaryTopic?.topicId
    ? getTopicPageUrl(primaryTopic.topicId, service, variant, topicsPath)
    : attribution?.link || (service ? getBrandPath(service) : null);
  const attributionText =
    primaryTopic?.topicName || attribution?.text || brandName;
  const hasAttribution = attributionLink && attributionText;

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
        {hasAttribution && <div css={styles.divider} />}
        {hasAttribution && (
          <Promo.A
            href={attributionLink}
            css={styles.subject}
            {...clickTrackerHandler}
          >
            {attributionText}
          </Promo.A>
        )}
      </div>
    </div>
  );
};

export default HighImpactPromo;
