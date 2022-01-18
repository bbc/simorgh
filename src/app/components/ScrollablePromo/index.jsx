import React, { useContext } from 'react';
import { arrayOf, shape, string, oneOfType, object } from 'prop-types';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import styled from '@emotion/styled';
import isEmpty from 'ramda/src/isEmpty';
import tail from 'ramda/src/tail';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { GridItemMediumNoMargin } from '#app/components/Grid';
import { ServiceContext } from '#contexts/ServiceContext';
import Promo from './Promo';
import PromoList from './PromoList';

const PromoWrapper = styled.div`
  ${({ dir }) => `margin-${dir === 'ltr' ? 'left' : 'right'}: ${GEL_SPACING};`}
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    ${({ dir }) =>
      `margin-${dir === 'ltr' ? 'left' : 'right'}: ${GEL_SPACING_DBL};`}
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    ${({ dir }) => `margin-${dir === 'ltr' ? 'left' : 'right'}: 0;`}
  }
`;

const ScrollablePromo = ({ blocks }) => {
  const { dir } = useContext(ServiceContext);
  if (isEmpty(blocks)) {
    return null;
  }

  const blocksWithoutTitle = blocks[0].type === 'title' ? tail(blocks) : blocks;

  const isSingleItem = blocksWithoutTitle.length === 1;

  return (
    <GridItemMediumNoMargin>
      {isSingleItem ? (
        <PromoWrapper dir={dir}>
          <Promo block={blocksWithoutTitle[0]} />
        </PromoWrapper>
      ) : (
        <PromoList blocks={blocksWithoutTitle} />
      )}
    </GridItemMediumNoMargin>
  );
};

ScrollablePromo.propTypes = {
  blocks: arrayOf(
    shape({
      type: string.isRequired,
      model: shape({
        blocks: arrayOf(oneOfType([string, object])),
      }).isRequired,
    }),
  ).isRequired,
};

export default ScrollablePromo;
