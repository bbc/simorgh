/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Summary } from '#app/models/types/curationData';
import Promo from '#components/Promo';

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
  // TODO: temp - to be removed
  subject = {
    href: `https://www.bbc.com/news`,
    text: 'BBC News',
  },
}: HighImpactPromoProps) => {
  return (
    <div data-testid="high-impact-promo" css={styles.promo}>
      {imageUrl && (
        <div css={styles.imageContainer}>
          <Promo.Image
            src={imageUrl}
            alt={imageAlt}
            loading={lazy ? 'lazy' : 'eager'}
          />
        </div>
      )}
      <div css={styles.content}>
        <Promo.Heading as={`h${headingLevel}`} css={styles.heading}>
          <Promo.A href={link} css={styles.headingLink}>
            {title}
          </Promo.A>
        </Promo.Heading>

        {subject && <div css={styles.divider} />}

        {subject && (
          <Promo.A href={subject.href} css={styles.subject}>
            {subject.text}
          </Promo.A>
        )}
      </div>
    </div>
  );
};

export default HighImpactPromo;
