import React from 'react';
import path from 'ramda/src/path';
import styled from '@emotion/styled';

import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';

import { articleDataPropTypes } from '#models/propTypes/article';

import { Secondary } from './MediaArticlePageGrid';

const ResponsiveComponentWrapper = styled.div`
  margin-bottom: ${GEL_SPACING_TRPL};
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING};
    padding: ${GEL_SPACING_DBL};
  }
`;

const SecondaryColumn = ({ pageData }) => {
  const latestMedia = path(['secondaryColumn', 'latestMedia'], pageData);

  if (!latestMedia) return null;

  return (
    <Secondary>
      <ResponsiveComponentWrapper data-testid="features" />
    </Secondary>
  );
};

SecondaryColumn.propTypes = {
  pageData: articleDataPropTypes.isRequired,
};

export default SecondaryColumn;
