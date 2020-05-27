import React, { Fragment } from 'react';
import path from 'ramda/src/path';
import styled from 'styled-components';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
} from '@bbc/gel-foundations/spacings';
import FrontPageSection from '#containers/FrontPageSection';

export const StyledFrontPageDiv = styled.div`
  /* To add GEL Margins */
  margin: 0 ${GEL_MARGIN_BELOW_400PX};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin: 0 ${GEL_MARGIN_ABOVE_400PX};
  }

  /* To add extra spacing */
  padding-top: ${GEL_SPACING};
  padding-bottom: ${GEL_SPACING_QUAD};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING_DBL};
  }

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    padding-bottom: ${GEL_SPACING_TRPL};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding-top: 0;
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_QUIN};
  }
`;

const IdxPage = ({ pageData }) => {
  const groups = path(['content', 'groups'], pageData);
  console.log('pageData---', pageData);
  return (
    <main role="main">
      <h1 id="content">IDX Page</h1>
      <StyledFrontPageDiv>
        {groups.map((group, index) => (
          <Fragment key={group.title}>
            <FrontPageSection group={group} sectionNumber={index} />
          </Fragment>
        ))}
      </StyledFrontPageDiv>
    </main>
  );
};

export default IdxPage;
