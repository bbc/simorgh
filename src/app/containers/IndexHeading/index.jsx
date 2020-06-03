import React from 'react';
import { node, shape, string, oneOf } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import styled from 'styled-components';
import IndexHeading from '@bbc/psammead-heading-index';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING, GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';

const StyledIndexHeading = styled(IndexHeading)`
  padding-bottom: ${GEL_SPACING_TRPL};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: ${GEL_SPACING_TRPL} 0 ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_TRPL} 0 0;
  }

  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    width: 100%; /* Needed for IE11 */
    margin: 0 auto;
    max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  }
`;

const IndexHeadingContainer = ({ children, script, service, dir }) => {
  return (
    <StyledIndexHeading script={script} service={service} dir={dir}>
      {children}
    </StyledIndexHeading>
  );
};

IndexHeadingContainer.propTypes = {
  children: node,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  dir: oneOf(['ltr', 'rtl']),
};

IndexHeadingContainer.defaultProps = {
  children: null,
  dir: 'ltr',
};

export default IndexHeadingContainer;
