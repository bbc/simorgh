import React, { useContext } from 'react';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';

import { getDoublePica } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import styled from '@emotion/styled';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import isEmpty from 'ramda/src/isEmpty';
import tail from 'ramda/src/tail';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { GridItemMediumNoMargin } from '#components/Grid';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import idSanitiser from '#lib/utilities/idSanitiser';
import { ServiceContext } from '../../../contexts/ServiceContext';
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

const LabelComponent = styled.strong`
  display: block;
  ${({ script }) => script && getDoublePica(script)};
  ${({ service }) => getSansRegular(service)}
  margin-bottom: ${GEL_SPACING_DBL};
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.SHADOW};

  ${({ dir }) =>
    `
    @media (min-width: ${GEL_GROUP_0_SCREEN_WIDTH_MIN}){
      margin-${dir === 'ltr' ? 'left' : 'right'}: ${GEL_SPACING};
    }
    @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}){
      margin-${dir === 'ltr' ? `left` : `right`}: ${GEL_SPACING_DBL};  
    }
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}){
        margin-${dir === 'ltr' ? `left` : `right`}: 0;
    }
`}
`;

const ScrollablePromo = ({ blocks, blockGroupIndex = null }) => {
  const { script, service, dir, translations } = useContext(ServiceContext);

  const eventTrackingData = {
    componentName: `edoj${blockGroupIndex}`,
    format: 'CHD=edoj',
  };

  const viewRef = useViewTracker(eventTrackingData);
  const handleClickTracking = useClickTrackerHandler(eventTrackingData);

  if (!blocks || isEmpty(blocks)) {
    return null;
  }

  const title =
    blocks[0].type === 'title' &&
    path(
      ['0', 'model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'text'],
      blocks,
    );

  const blocksWithoutTitle = blocks[0].type === 'title' ? tail(blocks) : blocks;

  const isSingleItem = blocksWithoutTitle.length === 1;

  const ariaLabel = title && idSanitiser(title);

  const a11yAttributes = {
    as: 'section',
    role: 'region',
    ...(ariaLabel
      ? { 'aria-labelledby': ariaLabel }
      : {
          'aria-label': pathOr(
            'Related Content',
            ['relatedContent'],
            translations,
          ),
        }),
  };

  return (
    <GridItemMediumNoMargin {...a11yAttributes}>
      {title && (
        <LabelComponent
          id={ariaLabel}
          data-testid="eoj-recommendations-heading"
          script={script}
          service={service}
          dir={dir}
        >
          {title}
        </LabelComponent>
      )}
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

export default ScrollablePromo;
