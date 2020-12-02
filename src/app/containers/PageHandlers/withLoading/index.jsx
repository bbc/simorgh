import React, { useEffect, useRef } from 'react';
import { bool, element } from 'prop-types';
import styled from '@emotion/styled';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';

import { GridWrapper, GridItemMedium } from '#app/components/Grid';

let timeout;
const LoadingMain = styled.main`
  min-height: 100vh;
`;

const WithLoading = Component => {
  const LoadingContainer = ({ loading, ...props }) => {
    const loadingMessageRef = useRef();

    useEffect(() => {
      if (loading) {
        timeout = setTimeout(() => {
          if (loadingMessageRef) {
            loadingMessageRef.current.focus();
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
          <GridItemMedium>
            <div tabIndex="-1" ref={loadingMessageRef}>
              <VisuallyHiddenText>Loading next page.</VisuallyHiddenText>
            </div>
          </GridItemMedium>
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
