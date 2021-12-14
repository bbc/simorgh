import React, { useContext } from 'react';
import { array } from 'prop-types';
import styled from '@emotion/styled';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/dist/breakpoints';
import Promo from './Promo';
import PromoList from './PromoList';
import { GridItemMediumNoMargin } from '#app/components/Grid';
import { ServiceContext } from '#contexts/ServiceContext';

const PromoWrapper = styled.div`
  ${({ dir }) => `margin-${dir === 'ltr' ? 'left' : 'right'}: 8px;`}
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    ${({ dir }) => `margin-${dir === 'ltr' ? 'left' : 'right'}: 16px;`}
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    ${({ dir }) => `margin-${dir === 'ltr' ? 'left' : 'right'}: 0;`}
  }
`;

const ScrollablePromo = ({ blocks }) => {
  const { dir } = useContext(ServiceContext);
  const isSingleItem = blocks.length === 2;

  // IF NO PROMO RETURN NULL
  return (
    <GridItemMediumNoMargin>
      {isSingleItem ? (
        <PromoWrapper dir={dir}>
          <Promo block={blocks[1]} />
        </PromoWrapper>
      ) : (
        <PromoList blocks={blocks} />
      )}
    </GridItemMediumNoMargin>
  );
};

ScrollablePromo.propTypes = {
  blocks: array.isRequired,
};

export default ScrollablePromo;
