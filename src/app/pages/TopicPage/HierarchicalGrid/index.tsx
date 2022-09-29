/** @jsx jsx */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { jsx, Theme } from '@emotion/react';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '../../../legacy/psammead/gel-foundations/src/breakpoints';
import Promo from '../../../legacy/components/Promo';
import { DESKTOP, TABLET, MOBILE, SMALL } from './dataStructures';

type Summary = {
  title: string,
  description?: string,
  type: string,
  id: string,
  link?: string,
  firstPublished: string | number,
  mediaDuration?: string | number,
  imageUrl: string,
  imageAlt: string,
  mediaType?: 'audio' | 'video' | 'photogallery',
};

type Summaries = {
  summaries: Summary[];
};

const PromoList = styled.ul`
  padding: 1.5rem;
  margin: 0;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Item = styled.div`
  position: relative;
  display: inline;
`;

const getStyles = (promoCount: number, i: number, mq: any) => {
  return css`
    ${mq.GROUP_1_MAX_WIDTH} {
      ${SMALL[promoCount - 1][i]}
    }
    ${mq.GROUP_2_ONLY} {
      ${MOBILE[promoCount - 1][i]}
    }
    ${mq.GROUP_3_ONLY} {
      ${TABLET[promoCount - 1][i]}
    }
    ${mq.GROUP_4_MIN_WIDTH} {
      ${DESKTOP[promoCount - 1][i]}
    }
  `;
};

const HiearchicalGrid = ({ summaries }: Summaries) => {
  if (!summaries || summaries.length < 3) return null;
  const summaryItems = summaries.slice(0, 12);
  return (
    <PromoList role="list">
      {summaryItems.map((promo, i) => {
        return (
          <Item
            key={promo.id}
            css={({ mq }: Theme) => getStyles(summaryItems.length, i, mq)}
            as="li"
          >
            <Promo>
              <Promo.Image
                src={promo.imageUrl}
                alt={promo.imageAlt}
                loading="lazy"
              >
                <Promo.MediaIcon type={promo.mediaType}>
                  {promo.mediaDuration}
                </Promo.MediaIcon>
              </Promo.Image>
              <Promo.Heading>
                <Promo.A href={promo.link}>{promo.title}</Promo.A>
              </Promo.Heading>
              <Promo.Body className="promo-paragraph">
                {promo.description}
              </Promo.Body>
              <Promo.Timestamp className="promo-timestamp">
                {promo.firstPublished}
              </Promo.Timestamp>
            </Promo>
          </Item>
        );
      })}
    </PromoList>
  );
};

export default HiearchicalGrid;
