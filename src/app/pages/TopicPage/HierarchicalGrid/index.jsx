import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { string, shape, arrayOf, number, oneOfType, oneOf } from 'prop-types';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import Promo, { MEDIA_TYPES } from '#components/Promo';
import { DESKTOP, TABLET, MOBILE, SMALL } from './dataStructures';

const PromoList = styled.ul`
  padding: 1.5rem;
  margin: 0;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Item = styled.div`
  position: relative;
  display: inline;
  background-color: white;
  padding: 1rem;
`;

const getStyles = (promoCount, i) => {
  return [
    css`
      @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
        ${SMALL[promoCount - 1][i]}
      }
      @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
        ${MOBILE[promoCount - 1][i]}
      }
      @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
        ${TABLET[promoCount - 1][i]}
      }
      @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
        ${DESKTOP[promoCount - 1][i]}
      }
    `,
  ];
};

const HiearchicalGrid = ({ summaries }) => {
  if (!summaries || summaries.length < 3) return null;
  const summaryItems = summaries.slice(0, 12);
  return (
    <PromoList role="list">
      {summaryItems.map((promo, i) => {
        return (
          <Item key={promo.id} css={getStyles(summaryItems.length, i)} as="li">
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

HiearchicalGrid.propTypes = {
  summaries: arrayOf(
    shape({
      title: string.isRequired,
      firstPublished: oneOfType([number, string]).isRequired,
      imageUrl: string.isRequired,
      imageAlt: string.isRequired,
      mediaType: oneOf(Object.values(MEDIA_TYPES)),
    }),
  ).isRequired,
};

export default HiearchicalGrid;
