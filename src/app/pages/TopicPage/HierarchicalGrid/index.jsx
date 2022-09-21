import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { string, shape, arrayOf, number, oneOfType, oneOf } from 'prop-types';
import Promo, { MEDIA_TYPES } from '#components/Promo';
import { DESKTOP, TABLET, MOBILE, SMALL } from './dataStructures';

const PromoList = styled.ul`
  padding: 0;
  margin: 0;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (max-width: 1007px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 599px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Item = styled.div`
  position: relative;
  display: inline;
`;

const getStyles = (promoCount, i) => {
  return [
    css`
      @media (max-width: 399px) {
        ${SMALL[promoCount - 1][i]}
      }
    `,
    css`
      @media (min-width: 400px) and (max-width: 599px) {
        ${MOBILE[promoCount - 1][i]}
      }
    `,
    css`
      @media (min-width: 600px) and (max-width: 1007px) {
        ${TABLET[promoCount - 1][i]}
      }
    `,
    css`
      @media (min-width: 1008px) {
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
