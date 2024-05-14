import React, { useContext } from 'react';
import SectionLabel from '#psammead/psammead-section-label/src';
import styled from '@emotion/styled';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';

import { RequestContext } from '#contexts/RequestContext';
import { GridWrapper, GridItemLarge } from '#components/Grid';
import { MOST_WATCHED_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContext } from '../../../contexts/ServiceContext';
import SkipLinkWrapper from '../../components/SkipLinkWrapper';
import { GHOST } from '../../../components/ThemeProvider/palette';

const Wrapper = styled.div`
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    padding: 0 ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: 0 ${GEL_SPACING_DBL};
  }
`;

const gridMarginSmall = `
  margin-bottom: ${GEL_SPACING_DBL};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }
`;

const LegacyGridItemLarge = styled(GridItemLarge)`
  ${gridMarginSmall}
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
  }
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding-bottom: 2rem;
    margin-bottom: 1rem;
  }
`;

const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: 0;
  }
  ${({ columnType }) =>
    columnType === 'main' &&
    `
    margin: 0;
    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      padding: ${GEL_SPACING_DBL} 0;
    }
  `}
`;

// Apply the correct top & bottom padding around the single story promo
const SingleContentWrapper = styled.div`
  ${({ columnType }) =>
    columnType === 'secondary' &&
    `
    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      padding-top: ${GEL_SPACING_DBL};
    }
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding-bottom: ${GEL_SPACING_TRPL};
    }
  `}
`;

const OptionallyRenderedSkipWrapper = ({
  skipLink = null,
  service,
  children,
}) =>
  skipLink ? (
    <SkipLinkWrapper service={service} {...skipLink}>
      {children}
    </SkipLinkWrapper>
  ) : (
    children
  );

const CpsOnwardJourney = ({
  className = '',
  LabelComponent = StyledSectionLabel,
  labelId,
  title = '',
  content = [],
  isMediaContent = false,
  parentColumns = null,
  promoListComponent: PromoListComponent,
  promoComponent: PromoComponent,
  sectionLabelOverrideAs = null,
  sectionLabelBar = true,
  sectionLabelBackground = GHOST,
  columnType,
  skipLink = null,
  eventTrackingData = null,
}) => {
  const { script, service, dir } = useContext(ServiceContext);
  const { pageType } = useContext(RequestContext);

  const isMostWatched = pageType === MOST_WATCHED_PAGE;
  const a11yAttributes = isMostWatched
    ? {
        as: 'div',
      }
    : { as: 'section', role: 'region', 'aria-labelledby': labelId };

  const CpsOnwardJourneyWrapper = ({ children }) =>
    parentColumns ? (
      <Wrapper
        data-e2e={labelId}
        {...a11yAttributes}
        {...(className && { className })}
      >
        {children}
      </Wrapper>
    ) : (
      <GridWrapper data-e2e={labelId} {...a11yAttributes}>
        <LegacyGridItemLarge dir={dir}>{children}</LegacyGridItemLarge>
      </GridWrapper>
    );

  if (!content.length) return null;
  const hasSingleContent = content.length === 1;
  const [singleContent] = content;

  return (
    <CpsOnwardJourneyWrapper>
      <OptionallyRenderedSkipWrapper skipLink={skipLink} service={service}>
        {title ? (
          <LabelComponent
            script={script}
            service={service}
            dir={dir}
            labelId={labelId}
            columnType={columnType}
            overrideHeadingAs={sectionLabelOverrideAs}
            bar={sectionLabelBar}
            backgroundColor={sectionLabelBackground}
          >
            {title}
          </LabelComponent>
        ) : null}
        {hasSingleContent ? (
          <SingleContentWrapper columnType={columnType}>
            <PromoComponent
              promo={singleContent}
              dir={dir}
              eventTrackingData={eventTrackingData}
            />
          </SingleContentWrapper>
        ) : (
          <PromoListComponent
            promoItems={content}
            dir={dir}
            isMediaContent={isMediaContent}
            eventTrackingData={eventTrackingData}
          />
        )}
      </OptionallyRenderedSkipWrapper>
    </CpsOnwardJourneyWrapper>
  );
};

export default CpsOnwardJourney;
