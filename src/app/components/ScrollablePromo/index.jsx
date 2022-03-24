import React, { useContext } from 'react';
import { arrayOf, shape, string, oneOfType, object, number } from 'prop-types';
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
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
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

const ScrollablePromo = ({ blocks, blockGroupIndex }) => {
  const { dir } = useContext(ServiceContext);

  const eventTrackingData = {
    componentName: `edoj${blockGroupIndex}`,
    format: 'CHD=edoj',
  };

  const viewRef = useViewTracker(eventTrackingData);
  const handleClickTracking = useClickTrackerHandler(eventTrackingData);

  if (!blocks || isEmpty(blocks)) {
    return null;
  }

  const blocksWithoutTitle = blocks[0].type === 'title' ? tail(blocks) : blocks;

  const isSingleItem = blocksWithoutTitle.length === 1;

  return (
    <GridItemMediumNoMargin>
      {isSingleItem ? (
        <PromoWrapper dir={dir} ref={viewRef}>
          <Promo block={blocksWithoutTitle[0]} onClick={handleClickTracking} />
        </PromoWrapper>
      ) : (
        <PromoList
          blocks={blocksWithoutTitle}
          viewTracker={viewRef}
          onClick={handleClickTracking}
        />
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
  blockGroupIndex: number,
};

ScrollablePromo.defaultProps = {
  blockGroupIndex: null,
};

export default ScrollablePromo;
