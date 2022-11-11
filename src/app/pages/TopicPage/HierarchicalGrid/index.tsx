/** @jsx jsx */

import { css, jsx, Theme } from '@emotion/react';
import Promo from '../../../legacy/components/Promo';
import { DESKTOP, TABLET, MOBILE, SMALL } from './dataStructures';
import { styles } from './index.styles';

type Promo = {
  title: string;
  description?: string;
  type: string;
  id: string;
  link?: string;
  firstPublished?: string | number;
  duration?: string | number;
  imageUrl?: string;
  imageAlt?: string;
  mediaType?: 'audio' | 'video' | 'photogallery';
};

type Promos = {
  headingLevel: number;
  promos: Promo[];
};

const getStyles = (promoCount: number, i: number, mq: any) => {
  return css({
    [mq.GROUP_1_MAX_WIDTH]: {
      ...SMALL[promoCount - 1][i],
    },
    [mq.GROUP_2_ONLY]: {
      ...MOBILE[promoCount - 1][i],
    },
    [mq.GROUP_3_ONLY]: {
      ...TABLET[promoCount - 1][i],
    },
    [mq.GROUP_4_MIN_WIDTH]: {
      ...DESKTOP[promoCount - 1][i],
    },
  });
};

const HiearchicalGrid = ({ promos, headingLevel }: Promos) => {
  if (!promos || promos.length < 3) return null;
  const promoItems = promos.slice(0, 12);
  return (
    <ul role="list" css={styles.list} data-testid="hierarchical-grid">
      {promoItems.map((promo, i) => {
        return (
          <li
            key={promo.id}
            css={({ mq }: Theme) => [
              styles.item,
              getStyles(promoItems.length, i, mq),
            ]}
          >
            <Promo>
              <Promo.Image
                src={promo.imageUrl || ''}
                alt={promo.imageAlt}
                loading="lazy"
              >
                <Promo.MediaIcon type={promo.type}>
                  {promo.duration}
                </Promo.MediaIcon>
              </Promo.Image>
              <Promo.Heading
                as={`h${headingLevel}`}
                css={(theme: Theme) => ({
                  color: theme.palette.GREY_10,
                  ...(i === 0 && theme.fontSizes.paragon),
                })}
              >
                <Promo.A href={promo.link}>{promo.title}</Promo.A>
              </Promo.Heading>
              <Promo.Body className="promo-paragraph" css={styles.body}>
                {promo.description}
              </Promo.Body>
              <Promo.Timestamp className="promo-timestamp">
                {promo.firstPublished}
              </Promo.Timestamp>
            </Promo>
          </li>
        );
      })}
    </ul>
  );
};

export default HiearchicalGrid;
