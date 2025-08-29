/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use } from 'react';
import { Summary } from '#app/models/types/curationData';
import Promo from '#components/Promo';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { RequestContext } from '#app/contexts/RequestContext';
import styles from './index.styles';

interface HighImpactPromoProps extends Summary {
  subject?: {
    href: string;
    text: string;
  };
}

const HighImpactPromo = ({
  title,
  imageUrl,
  imageAlt,
  lazy,
  link,
  headingLevel = 3,
  eventTrackingData,
  // TODO: temp - to be removed
  subject = {
    href: `https://www.bbc.com/news`,
    text: 'BBC News',
  },
}: HighImpactPromoProps) => {
  const { isAmp } = use(RequestContext);

  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  return (
    <div data-testid="high-impact-promo" css={styles.promo}>
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

        {subject && <div css={styles.divider} />}

        {subject && (
          <Promo.A
            href={subject.href}
            css={styles.subject}
            {...clickTrackerHandler}
          >
            {subject.text}
          </Promo.A>
        )}
      </div>
    </div>
  );
};

export default HighImpactPromo;
