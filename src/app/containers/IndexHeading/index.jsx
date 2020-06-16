import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { node, oneOf } from 'prop-types';
import IndexHeading from '@bbc/psammead-heading-index';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import { ServiceContext } from '#contexts/ServiceContext';

const IdxPaddingStyles = css`
  padding-bottom: ${GEL_SPACING_TRPL};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: ${GEL_SPACING_TRPL} 0 ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_TRPL} 0 0;
  }
`;

const MostReadPaddingStyles = css`
  padding: ${GEL_SPACING_DBL} 0 ${GEL_SPACING_TRPL};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: ${GEL_SPACING_TRPL} 0 ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_TRPL} 0 ${GEL_SPACING};
  }
`;

const paddingStyles = {
  idx: IdxPaddingStyles,
  mostRead: MostReadPaddingStyles,
};

const StyledIndexHeading = styled(IndexHeading)`
  ${({ pageType }) => paddingStyles[pageType]}
 
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    width: 100%; /* Needed for IE11 */
    margin: 0 auto;
    max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  }
`;

const IndexHeadingContainer = ({ children, pageType, ...props }) => {
  const { script, service, dir } = useContext(ServiceContext);

  return (
    <StyledIndexHeading
      script={script}
      service={service}
      dir={dir}
      pageType={pageType}
      {...props}
    >
      {children}
    </StyledIndexHeading>
  );
};

IndexHeadingContainer.propTypes = {
  children: node,
  pageType: oneOf(['idx', 'mostRead']),
};

IndexHeadingContainer.defaultProps = {
  children: null,
  pageType: 'idx',
};

export default IndexHeadingContainer;
