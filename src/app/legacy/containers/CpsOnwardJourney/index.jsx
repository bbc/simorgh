import React, { useContext } from 'react';
import {
  arrayOf,
  shape,
  number,
  node,
  string,
  func,
  bool,
  oneOf,
  elementType,
} from 'prop-types';
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
import { C_GHOST } from '#psammead/psammead-styles/src/colours';

import { storyItem } from '#models/propTypes/storyItem';
import { RequestContext } from '#contexts/RequestContext';
import Grid, { GridWrapper, GridItemLarge } from '#components/Grid';
import { MOST_WATCHED_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContext } from '../../../contexts/ServiceContext';
import SkipLinkWrapper from '../../components/SkipLinkWrapper';

const LargeGridColumns = {
  group0: 1,
  group1: 1,
  group2: 1,
  group3: 1,
  group4: 6,
  group5: 12,
};

const Wrapper = styled.div`
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    padding: 0 ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: 0 ${GEL_SPACING_DBL};
  }
`;

const LargeGrid = ({ children, ...gridProps }) => (
  <Grid
    {...gridProps}
    columns={LargeGridColumns}
    margins={{
      group0: true,
      group1: true,
      group2: true,
      group3: true,
      group4: false,
      group5: false,
    }}
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 3,
      group5: 6,
    }}
  >
    {children}
  </Grid>
);

LargeGrid.propTypes = {
  children: node.isRequired,
};

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

const OptionallyRenderedSkipWrapper = ({ skipLink, service, children }) =>
  skipLink ? (
    <SkipLinkWrapper service={service} {...skipLink}>
      {children}
    </SkipLinkWrapper>
  ) : (
    children
  );

const skipLinkProps = {
  terms: shape({
    '%title%': string,
  }),
  endTextVisuallyHidden: string,
  endTextId: string,
  text: string,
};

OptionallyRenderedSkipWrapper.propTypes = {
  service: string.isRequired,
  children: node.isRequired,
  skipLink: shape(skipLinkProps),
};

OptionallyRenderedSkipWrapper.defaultProps = {
  skipLink: null,
};

const CpsOnwardJourney = ({
  className,
  LabelComponent,
  labelId,
  title,
  content,
  isMediaContent,
  parentColumns,
  promoListComponent: PromoListComponent,
  promoComponent: PromoComponent,
  sectionLabelOverrideAs,
  sectionLabelBar,
  sectionLabelBackground,
  columnType,
  skipLink,
  eventTrackingData,
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
      <Wrapper data-e2e={labelId} {...a11yAttributes} className={className}>
        {children}
      </Wrapper>
    ) : (
      <GridWrapper data-e2e={labelId} {...a11yAttributes}>
        <LegacyGridItemLarge dir={dir}>{children}</LegacyGridItemLarge>
      </GridWrapper>
    );

  CpsOnwardJourneyWrapper.propTypes = {
    children: node.isRequired,
  };

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

CpsOnwardJourney.propTypes = {
  className: string,
  LabelComponent: elementType,
  labelId: string.isRequired,
  title: string,
  content: arrayOf(shape(storyItem)),
  isMediaContent: bool,
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
  promoListComponent: func.isRequired,
  promoComponent: func.isRequired,
  sectionLabelOverrideAs: string,
  sectionLabelBar: bool,
  sectionLabelBackground: string,
  /* since this component is reused in both the main and secondary columns,
      the property below helps ensure that it lays out properly in both
      usages.
  */
  columnType: oneOf(['main', 'secondary']).isRequired,
  skipLink: shape(skipLinkProps),
  eventTrackingData: shape({
    componentName: string,
  }),
};

CpsOnwardJourney.defaultProps = {
  className: '',
  LabelComponent: StyledSectionLabel,
  content: [],
  title: '',
  isMediaContent: false,
  parentColumns: null,
  sectionLabelOverrideAs: null,
  sectionLabelBar: true,
  sectionLabelBackground: C_GHOST,
  skipLink: null,
  eventTrackingData: null,
};

export default CpsOnwardJourney;
