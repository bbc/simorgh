import React, { useContext } from 'react';
import {
  arrayOf,
  shape,
  string,
  oneOfType,
  object,
  number,
  bool,
} from 'prop-types';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import isEmpty from 'ramda/src/isEmpty';
import tail from 'ramda/src/tail';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { GridItemMediumNoMargin } from '#app/components/Grid';
import { ServiceContext } from '#contexts/ServiceContext';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import SectionLabel from '@bbc/psammead-section-label';
import { C_GHOST } from '@bbc/psammead-styles/colours';
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

const LabelComponent = styled(SectionLabel)`
  margin: 0;
  padding: 0;
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0 0 ${GEL_SPACING};
  }
`;

const ScrollablePromo = ({ blocks, blockGroupIndex, recommendations }) => {
  const { script, service, dir, translations } = useContext(ServiceContext);

  const eventTrackingData = {
    componentName: `edoj${blockGroupIndex}`,
    format: 'CHD=edoj',
  };

  const viewRef = useViewTracker(eventTrackingData);
  const handleClickTracking = useClickTrackerHandler(eventTrackingData);

  if (isEmpty(blocks)) {
    return null;
  }

  const blocksWithoutTitle =
    blocks[0]?.type === 'title' ? tail(blocks) : blocks;

  const isSingleItem = blocksWithoutTitle.length === 1;

  const title = pathOr(
    'You may also be interested in',
    ['recommendationTitle'],
    translations,
  );

  const labelId = 'recommendations-heading';
  const a11yAttributes = {
    as: 'section',
    role: 'region',
    'aria-labelledby': labelId,
  };

  return (
    <GridItemMediumNoMargin
      {...(recommendations && { 'data-e2e': { labelId }, ...a11yAttributes })}
    >
      {recommendations && (
        <LabelComponent
          script={script}
          service={service}
          dir={dir}
          labelId={labelId}
          columnType="main"
          overrideHeadingAs="strong"
          bar={false}
          backgroundColor={C_GHOST}
        >
          {title}
        </LabelComponent>
      )}

      {isSingleItem ? (
        <PromoWrapper dir={dir} ref={viewRef}>
          <Promo
            block={blocksWithoutTitle[0]}
            onClick={handleClickTracking}
            recommendations={recommendations}
          />
        </PromoWrapper>
      ) : (
        <PromoList
          blocks={blocksWithoutTitle}
          viewTracker={viewRef}
          onClick={handleClickTracking}
          recommendations={recommendations}
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
  recommendations: bool,
};

ScrollablePromo.defaultProps = {
  blockGroupIndex: null,
  recommendations: false,
};

export default ScrollablePromo;
