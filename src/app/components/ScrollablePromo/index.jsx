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
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import isEmpty from 'ramda/src/isEmpty';
import tail from 'ramda/src/tail';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { getDoublePica } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { C_SHADOW } from '@bbc/psammead-styles/colours';
import { GridItemMediumNoMargin } from '#app/components/Grid';
import { ServiceContext } from '#contexts/ServiceContext';
import { OptimizelyContext } from '@optimizely/react-sdk';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';
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
  margin-bottom: ${GEL_SPACING_TRPL};
  color: ${C_SHADOW};
`;

const getEventTrackingData = (optimizely, blockGroupIndex) => ({
  componentName: `edoj${blockGroupIndex}`,
  format: 'CHD=edoj',
  ...(optimizely && { optimizely }),
});

const HINDI_EXPERIMENT_FEATURE_ID = path(['featureId'], OPTIMIZELY_CONFIG);

const ScrollablePromo = ({ blocks, blockGroupIndex, isRecommendationType }) => {
  const { script, service, dir, translations } = useContext(ServiceContext);
  const { optimizely } = useContext(OptimizelyContext);

  const promoVariation = useOptimizelyVariation(HINDI_EXPERIMENT_FEATURE_ID);
  const hasVariationKey = promoVariation !== null;
  const eventTrackingData = getEventTrackingData(
    isRecommendationType && hasVariationKey && optimizely,
    blockGroupIndex,
  );

  const viewRef = useViewTracker(eventTrackingData);
  const handleClickTracking = useClickTrackerHandler(eventTrackingData);

  if (isEmpty(blocks)) {
    return null;
  }

  const blocksWithoutTitle =
    blocks[0]?.type === 'title' ? tail(blocks) : blocks;

  const isSingleItem = blocksWithoutTitle.length === 1;

  const title = pathOr(
    'Recommended stories',
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
      {...(isRecommendationType && {
        'data-e2e': { labelId },
        ...a11yAttributes,
      })}
    >
      {isRecommendationType && (
        <LabelComponent
          id={labelId}
          script={script}
          service={service}
          dir={dir}
        >
          {title}
        </LabelComponent>
      )}

      {isSingleItem ? (
        <PromoWrapper dir={dir} ref={viewRef}>
          <Promo
            block={blocksWithoutTitle[0]}
            onClick={handleClickTracking}
            isRecommendationType={isRecommendationType}
          />
        </PromoWrapper>
      ) : (
        <PromoList
          blocks={blocksWithoutTitle}
          viewTracker={viewRef}
          onClick={handleClickTracking}
          isRecommendationType={isRecommendationType}
        />
      )}
    </GridItemMediumNoMargin>
  );
};

ScrollablePromo.propTypes = {
  blocks: oneOfType([
    arrayOf(
      shape({
        type: string.isRequired,
        model: shape({
          blocks: arrayOf(oneOfType([string, object])),
        }).isRequired,
      }),
    ),
    arrayOf(
      shape({
        headlines: shape({ headline: string.isRequired }),
        locators: shape({ assetUri: string.isRequired }),
      }),
    ),
  ]).isRequired,
  blockGroupIndex: number,
  isRecommendationType: bool,
};

ScrollablePromo.defaultProps = {
  blockGroupIndex: null,
  isRecommendationType: false,
};

export default ScrollablePromo;
