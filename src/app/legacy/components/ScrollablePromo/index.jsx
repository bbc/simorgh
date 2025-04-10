import React, { useContext } from 'react';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '#psammead/gel-foundations/src/spacings';

import {
  getDoublePica,
  getBrevier,
} from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import styled from '@emotion/styled';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import isEmpty from 'ramda/src/isEmpty';
import tail from 'ramda/src/tail';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { GridItemMediumNoMargin } from '#components/Grid';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import idSanitiser from '#lib/utilities/idSanitiser';
import { GREY_2 } from '#app/components/ThemeProvider/palette';
import { OptimizelyContext } from '@optimizely/react-sdk';
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

const ScrollablePromoContainer = styled.div`
  background: ${GREY_2};
  padding: ${GEL_SPACING};
  display: flex;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ experimentVariant }) =>
    experimentVariant &&
    experimentVariant !== 'off' &&
    `
    padding: 0 ${GEL_SPACING} ${GEL_SPACING_DBL};
    margin: 0rem;

    @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
      padding: 0 ${GEL_SPACING_DBL} ${GEL_SPACING_DBL};
      margin: 0 -0.2rem;
    }
    
    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      margin: 0 -0.8rem;
    }
    
    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      display: none;
    }

    width: 100vw;
  `}
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

const LabelComponentOJTopBar = styled(({ ariaLabel, ...props }) => (
  <strong aria-label={ariaLabel} {...props} />
))`
  ${({ script }) => script && getBrevier(script)};
  ${({ service }) => getSansRegular(service)}
  display: inline-block;
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

  padding: 0 ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_0_SCREEN_WIDTH_MIN}) {
    margin: 0rem;
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_DBL};
    margin: 0 -0.2rem;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0 -0.8rem;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    display: none;
  }

  display: flex;
  align-items: center;
  height: ${GEL_SPACING_QUAD};
  background: ${GREY_2};
  width: 100vw;
`;

const ScrollablePromo = ({
  blocks,
  blockGroupIndex = null,
  experimentVariant = null,
}) => {
  const { script, service, dir, translations, mostRead } =
    useContext(ServiceContext);
  const { optimizely } = useContext(OptimizelyContext);

  const eventTrackingData = {
    componentName: `edoj${blockGroupIndex}`,
    format: 'CHD=edoj',
    // We want to check for experimentVariant here as ScrollablePromo is used in within the Article body as well.
    // We only want to track Optimizely events for the Top Bar use case.
    ...(optimizely && experimentVariant && { optimizely }),
  };

  const viewRef = useViewTracker(eventTrackingData);
  const handleClickTracking = useClickTrackerHandler(eventTrackingData);

  if (!blocks || isEmpty(blocks)) {
    return null;
  }

  let title;
  if (experimentVariant === 'top_bar_top_stories') {
    title = translations.topStoriesTitle || 'Top Stories';
  } else if (experimentVariant === 'top_bar_most_read') {
    title = mostRead.header || 'Most Read';
  } else {
    title =
      blocks[0].type === 'title' &&
      path(
        ['0', 'model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'text'],
        blocks,
      );
  }

  const blocksWithoutTitle = blocks[0].type === 'title' ? tail(blocks) : blocks;

  const isSingleItem = blocksWithoutTitle.length === 1;

  const ariaLabel = title && idSanitiser(title);

  const a11yAttributes = {
    ...(!experimentVariant && {
      as: 'section',
      role: 'region',
    }),
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

  return experimentVariant ? (
    <>
      <LabelComponentOJTopBar
        id={ariaLabel}
        data-testid="oj-top-bar"
        script={script}
        service={service}
        dir={dir}
      >
        {title}
      </LabelComponentOJTopBar>
      <ScrollablePromoContainer experimentVariant={experimentVariant}>
        <GridItemMediumNoMargin>
          <PromoList
            blocks={blocks}
            experimentVariant={experimentVariant}
            viewTracker={viewRef}
            onClick={handleClickTracking}
            {...a11yAttributes}
          />
        </GridItemMediumNoMargin>
      </ScrollablePromoContainer>
    </>
  ) : (
    <GridItemMediumNoMargin {...a11yAttributes} data-e2e="scrollable-promos">
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
