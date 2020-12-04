import React, { useEffect, useRef } from 'react';
import { bool, element } from 'prop-types';
import styled from '@emotion/styled';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';

import { GridWrapper, GridItemLarge } from '#app/components/Grid';

let timeout;
const LoadingMain = styled.main`
  min-height: 100vh;
`;
const LoadingMessageWrapper = styled.div`
  outline: 0;
`;

const WithLoading = Component => {
  const LoadingContainer = ({ loading, ...props }) => {
    const loadingMessageRef = useRef();

    useEffect(() => {
      if (loading) {
        timeout = setTimeout(() => {
          if (loadingMessageRef.current) {
            loadingMessageRef.current.focus();
            window.scrollTo(0, 0);
          }
        }, 500);
      }

      return () => {
        clearTimeout(timeout);
      };
    }, [loading]);

    if (!loading) return <Component {...props} />;

    return (
      <LoadingMain role="main">
        <GridWrapper>
          <GridItemLarge>
            <LoadingMessageWrapper
              tabIndex="-1"
              ref={loadingMessageRef}
              data-testid="loading-message"
            >
              <VisuallyHiddenText>Loading next page.</VisuallyHiddenText>
            </LoadingMessageWrapper>
          </GridItemLarge>
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
