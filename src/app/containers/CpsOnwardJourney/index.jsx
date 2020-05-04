import React, { useContext } from 'react';
import { arrayOf, shape, any, node, string, func } from 'prop-types';
import SectionLabel from '@bbc/psammead-section-label';
import styled, { css } from 'styled-components';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import Grid from '@bbc/psammead-grid';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { GridWrapper, GridItemConstrainedLarge } from '#lib/styledGrid';
import { gelGridMargin } from '#app/lib/layoutGrid';

const ConstrainedLargeGridColumns = {
  group0: 1,
  group1: 1,
  group2: 1,
  group3: 1,
  group4: 6,
  group5: 12,
};

const ConstrainedLargeGrid = ({ children, ...gridProps }) => (
  <Grid
    {...gridProps}
    columns={ConstrainedLargeGridColumns}
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

ConstrainedLargeGrid.propTypes = {
  children: node.isRequired,
};

const gridMarginSmall = css`
  margin-bottom: ${GEL_SPACING_DBL};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }
`;

const Wrapper = styled(ConstrainedLargeGrid)`
  ${gelGridMargin}
  ${gridMarginSmall}
`;

const EnabledGridWrapper = styled(GridItemConstrainedLarge)`
  ${gridMarginSmall}
`;

const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;
`;

// Apply the correct top & bottom padding around the single story promo
const SingleContentWrapper = styled.div`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-top: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_TRPL};
  }
`;

const CpsOnwardJourney = ({
  labelId,
  title,
  content,
  parentColumns,
  listTransform,
  singleTransform,
}) => {
  const a11yAttributes = {
    as: 'section',
    role: 'region',
    'aria-labelledby': labelId,
  };
  const { script, service, dir } = useContext(ServiceContext);
  const CpsOnwardJourneyWrapper = ({ children }) =>
    !parentColumns ? (
      <GridWrapper {...a11yAttributes}>
        <EnabledGridWrapper>{children}</EnabledGridWrapper>
      </GridWrapper>
    ) : (
      <Wrapper parentColumns={parentColumns} {...a11yAttributes}>
        {children}
      </Wrapper>
    );

  CpsOnwardJourneyWrapper.propTypes = {
    children: node.isRequired,
  };

  if (!content.length) return null;
  const hasSingleContent = content.length === 1;
  const [singleContent] = content;

  const WrapperItem = ({ children }) => (
    <Wrapper parentColumns={ConstrainedLargeGridColumns} item>
      {children}
    </Wrapper>
  );

  WrapperItem.propTypes = {
    children: node.isRequired,
  };

  const CpsOnwardJourneyItemWrapper = !parentColumns
    ? EnabledGridWrapper
    : WrapperItem;

  return (
    <CpsOnwardJourneyWrapper>
      <CpsOnwardJourneyItemWrapper>
        <StyledSectionLabel
          script={script}
          service={service}
          dir={dir}
          labelId={labelId}
        >
          {title}
        </StyledSectionLabel>
        {hasSingleContent ? (
          <SingleContentWrapper>
            {singleTransform(singleContent)}
          </SingleContentWrapper>
        ) : (
          listTransform(content)
        )}
      </CpsOnwardJourneyItemWrapper>
    </CpsOnwardJourneyWrapper>
  );
};

CpsOnwardJourney.propTypes = {
  labelId: string.isRequired,
  title: string.isRequired,
  content: arrayOf(shape(storyItem)),
  parentColumns: shape(any),
  listTransform: func.isRequired,
  singleTransform: func.isRequired,
};

CpsOnwardJourney.defaultProps = {
  content: [],
  parentColumns: null,
};

export default CpsOnwardJourney;
