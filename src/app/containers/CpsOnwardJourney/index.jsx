import React, { useContext } from 'react';
import { arrayOf, shape, bool, node, string, func } from 'prop-types';
import SectionLabel from '@bbc/psammead-section-label';
import styled from 'styled-components';

import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { GridItemConstrainedLarge } from '#lib/styledGrid';
import Grid from '#app/components/Grid';

const Wrapper = styled(GridItemConstrainedLarge)`
  margin-bottom: ${GEL_SPACING_DBL};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }
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
  enableGridWrapper,
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
    enableGridWrapper ? (
      <Grid {...a11yAttributes}>
        <Wrapper>{children}</Wrapper>
      </Grid>
    ) : (
      <Wrapper {...a11yAttributes}>{children}</Wrapper>
    );
  CpsOnwardJourneyWrapper.propTypes = {
    children: node.isRequired,
  };
  if (!content.length) return null;
  const hasSingleContent = content.length === 1;
  const [singleContent] = content;

  return (
    <CpsOnwardJourneyWrapper>
      <Wrapper>
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
      </Wrapper>
    </CpsOnwardJourneyWrapper>
  );
};

CpsOnwardJourney.propTypes = {
  labelId: string.isRequired,
  title: string.isRequired,
  content: arrayOf(shape(storyItem)),
  enableGridWrapper: bool,
  listTransform: func.isRequired,
  singleTransform: func.isRequired,
};

CpsOnwardJourney.defaultProps = {
  content: [],
  enableGridWrapper: false,
};

export default CpsOnwardJourney;
