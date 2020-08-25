import React from 'react';
import { bool, element } from 'prop-types';
import styled from 'styled-components';
import { GridWrapper, GridItemConstrainedMedium } from '#lib/styledGrid';

const StyledMain = styled.main`
  min-height: 1000px;
`;

const WithLoading = Component => {
  const LoadingContainer = ({ loading, ...props }) => {
    if (!loading) {
      debugger;
      return <Component {...props} />;
    }
    debugger;
    return (
      <StyledMain role="main">
        <GridWrapper>
          <GridItemConstrainedMedium />
        </GridWrapper>
      </StyledMain>
    );
  };

  LoadingContainer.propTypes = {
    loading: bool,
  };

  LoadingContainer.defaultProps = {
    loading: false,
  };

  return LoadingContainer;
};

WithLoading.propTypes = {
  Component: element,
};

export default WithLoading;
