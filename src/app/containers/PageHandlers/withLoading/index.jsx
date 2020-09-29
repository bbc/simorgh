import React, { useEffect, useState } from 'react';
import { bool, element } from 'prop-types';
import styled from 'styled-components';
import { GridWrapper, GridItemConstrainedMedium } from '#lib/styledGrid';

let timeout;
const LoadingMain = styled.main`
  min-height: 100vh;
`;

const WithLoading = Component => {
  const LoadingContainer = ({ loading, ...props }) => {
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => {
      if (loading) {
        timeout = setTimeout(() => {
          setShowLoading(true);
        }, 500);
      }
      return () => clearTimeout(timeout);
    }, [loading]);

    if (!loading) return <Component {...props} />;

    return (
      <LoadingMain role="main">
        <GridWrapper>
          <GridItemConstrainedMedium>
            {showLoading && <div data-testid="loading" />}
          </GridItemConstrainedMedium>
        </GridWrapper>
      </LoadingMain>
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
