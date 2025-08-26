/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Summary } from '#app/models/types/curationData';
import Promo from '#components/Promo';

import styles from './index.styles';

type HighImpactPromoProps = Summary;

const HighImpactPromo = ({
  id,
  title,
  imageUrl,
  imageAlt,
  lazy,
  link,
  headingLevel = 3,
}: HighImpactPromoProps) => {
  return (
    <div data-testid="high-impact-promo" css={styles.promo}>
      {imageUrl && (
        <div css={styles.imageContainer}>
          <Promo.Image
            src={imageUrl}
            alt={imageAlt}
            loading={lazy ? 'lazy' : 'eager'}
            css={styles.image}
          />
        </div>
      )}
      <div css={styles.content}>
        <Promo.Heading as={`h${headingLevel}`}>
          <Promo.A href={link} css={styles.heading}>
            {title}
          </Promo.A>
        </Promo.Heading>
      </div>
    </div>
  );
};

export default HighImpactPromo;
