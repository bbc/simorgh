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
} from 'prop-types';
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
import { C_GHOST } from '@bbc/psammead-styles/colours';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import {
  GridWrapper as LegacyGridWrapper,
  GridItemConstrainedLarge,
} from '#lib/styledGrid';
import { gelGridMargin } from '#app/lib/layoutGrid';

const constrainedLargeGridColumns = {
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
    columns={constrainedLargeGridColumns}
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
  ${({ columnType }) =>
    columnType === 'main' &&
    `
    padding: 0 ${GEL_SPACING_DBL};
  `}
`;

const LegacyGridItemConstrainedLarge = styled(GridItemConstrainedLarge)`
  ${gridMarginSmall}
`;

const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;
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

const CpsOnwardJourney = ({
  labelId,
  title,
  content,
  parentColumns,
  listTransform,
  singleTransform,
  sectionLabelOverrideAs,
  sectionLabelBar,
  sectionLabelBackground,
  columnType,
}) => {
  const a11yAttributes = {
    as: 'section',
    role: 'region',
    'aria-labelledby': labelId,
  };
  const { script, service, dir } = useContext(ServiceContext);
  const CpsOnwardJourneyWrapper = ({ children }) =>
    parentColumns ? (
      <Wrapper
        data-e2e="related-content"
        parentColumns={parentColumns}
        columnType={columnType}
        {...a11yAttributes}
      >
        {children}
      </Wrapper>
    ) : (
      <LegacyGridWrapper data-e2e="related-content" {...a11yAttributes}>
        <LegacyGridItemConstrainedLarge>
          {children}
        </LegacyGridItemConstrainedLarge>
      </LegacyGridWrapper>
    );

  CpsOnwardJourneyWrapper.propTypes = {
    children: node.isRequired,
  };

  if (!content.length) return null;
  const hasSingleContent = content.length === 1;
  const [singleContent] = content;

  const WrapperItem = ({ children }) => (
    <Wrapper parentColumns={constrainedLargeGridColumns} item>
      {children}
    </Wrapper>
  );

  WrapperItem.propTypes = {
    children: node.isRequired,
  };

  return (
    <CpsOnwardJourneyWrapper>
      <StyledSectionLabel
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
      </StyledSectionLabel>
      {hasSingleContent ? (
        <SingleContentWrapper columnType={columnType}>
          {singleTransform(singleContent)}
        </SingleContentWrapper>
      ) : (
        listTransform(content)
      )}
    </CpsOnwardJourneyWrapper>
  );
};

CpsOnwardJourney.propTypes = {
  labelId: string.isRequired,
  title: string.isRequired,
  content: arrayOf(shape(storyItem)),
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
  listTransform: func.isRequired,
  singleTransform: func.isRequired,
  sectionLabelOverrideAs: string,
  sectionLabelBar: bool,
  sectionLabelBackground: string,
  /* since this component is reused in both the main and secondary columns,
      the property below help ensure that it layss out properrly in both
      usages.
  */
  columnType: oneOf(['main', 'secondary']).isRequired,
};

CpsOnwardJourney.defaultProps = {
  content: [],
  parentColumns: null,
  sectionLabelOverrideAs: null,
  sectionLabelBar: true,
  sectionLabelBackground: C_GHOST,
};

export default CpsOnwardJourney;
