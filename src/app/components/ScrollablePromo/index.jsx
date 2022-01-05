import React, { useContext } from 'react';
import { arrayOf, shape, string, oneOfType, object } from 'prop-types';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import styled from '@emotion/styled';
import isEmpty from 'ramda/src/isEmpty';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import useViewTracker from '#hooks/useViewTracker';
import Promo from './Promo';
import PromoList from './PromoList';
import { GridItemMediumNoMargin } from '#app/components/Grid';
import { ServiceContext } from '#contexts/ServiceContext';

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
  const viewTracker = useViewTracker({
    componentName: 'scrollable-promo',
  });

  const { dir } = useContext(ServiceContext);
  if (isEmpty(blocks)) {
    return null;
  }
  const isSingleItem = blocks.length === 2;

  return (
    <GridItemMediumNoMargin ref={viewTracker}>
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
