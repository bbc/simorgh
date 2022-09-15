import React from 'react';
import styled from '@emotion/styled';
import uniq from 'ramda/src/uniq';
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
  border-radius: 3px;
`;

const getStyles = (promoCount, i) => {
  return uniq([
    SMALL[promoCount - 1][i],
    MOBILE[promoCount - 1][i],
    TABLET[promoCount - 1][i],
    DESKTOP[promoCount - 1][i],
  ]);
};

const HiearchicalGrid = props => {
  const { summaries } = props;
  const promoCount = summaries.length;
  if (promoCount < 3) return null;
  return (
    <PromoList role="list">
      {summaries.map((promo, i) => {
        return (
          <Item key={promo.id} css={getStyles(promoCount, i)} as="li">
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
