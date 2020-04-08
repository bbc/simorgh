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
import { GridWrapper, GridItemConstrainedLarge } from '#lib/styledGrid';

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

const CpsAsset = ({
  title,
  content,
  enableGridWrapper,
  a11yAttributes,
  listTransform,
  singleTransform,
}) => {
  const { script, service, dir } = useContext(ServiceContext);
  const CpsAssetWrapper = ({ children }) =>
    enableGridWrapper ? (
      <GridWrapper {...a11yAttributes}>
        <Wrapper>{children}</Wrapper>
      </GridWrapper>
    ) : (
      <Wrapper {...a11yAttributes}>{children}</Wrapper>
    );
  CpsAssetWrapper.propTypes = {
    children: node.isRequired,
  };
  if (!content.length) return null;
  const hasSingleContent = content.length === 1;
  const [singleContent] = content;

  const labelId = a11yAttributes['aria-labelledby'];

  return (
    <CpsAssetWrapper>
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
    </CpsAssetWrapper>
  );
};

CpsAsset.propTypes = {
  title: string.isRequired,
  content: arrayOf(shape(storyItem)),
  enableGridWrapper: bool,
  a11yAttributes: shape({
    as: string,
    role: string,
    'aria-labelledby': string,
  }).isRequired,
  listTransform: func.isRequired,
  singleTransform: func.isRequired,
};

CpsAsset.defaultProps = {
  content: [],
  enableGridWrapper: false,
};

export default CpsAsset;
