import React, { useContext } from 'react';
import styled from '@emotion/styled';
import IndexHeading from '#psammead/psammead-heading-index/src';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import { ServiceContext } from '../../../contexts/ServiceContext';

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

const IndexHeadingContainer = ({ children = null, ...props }) => {
  const { script, service, dir } = useContext(ServiceContext);

  return (
    <StyledIndexHeading script={script} service={service} dir={dir} {...props}>
      {children}
    </StyledIndexHeading>
  );
};

export default IndexHeadingContainer;
