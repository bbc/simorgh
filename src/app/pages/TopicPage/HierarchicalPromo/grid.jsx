import React from 'react';
import styled from '@emotion/styled';
import { string, shape, arrayOf, number, oneOfType, oneOf } from 'prop-types';
import Promo, { MEDIA_TYPES } from '#components/Promo';
import { DESKTOP, TABLET, MOBILE, SMALL } from './dataStructures';

const Grid = styled.div`
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
  background-color: #f2f2f2;
  position: relative;
  border-radius: 3px;
`;

const getStyles = (promoLength, i) => {
  return [
    SMALL[promoLength - 1][i],
    MOBILE[promoLength - 1][i],
    TABLET[promoLength - 1][i],
    DESKTOP[promoLength - 1][i],
  ];
};

const HiearchicalGrid = props => {
  const { summaries } = props;
  const promoLength = summaries.length;
  return (
    <Grid>
      {summaries.map((promo, i) => {
        return (
          <Item key={promo.id} css={getStyles(promoLength, i)}>
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
    </Grid>
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
