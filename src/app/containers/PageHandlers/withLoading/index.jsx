import React, { useEffect, useState, useLayoutEffect } from 'react';
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
    const [showLoading, setShowLoading] = useState(false);
    console.log('xxx hello');

    useEffect(() => {
      if (loading) {
        timeout = setTimeout(() => {
          console.log('xxx setShowLoading');

          setShowLoading(true);
        }, 500);
      }
      return () => clearTimeout(timeout);
    }, [loading]);

    useLayoutEffect(() => {
      if (showLoading) {
        document.querySelector('#loading').focus();
        console.log('xxx showLoading is true');
      }
    }, [showLoading]);

    if (!loading) return <Component {...props} />;

    return (
      <LoadingMain role="main">
        <GridWrapper>
          <GridItemMedium>
            {showLoading && (
              <div data-testid="loading">
                <VisuallyHiddenText tabIndex="-1" id="loading">
                  Loading next page.
                </VisuallyHiddenText>
              </div>
            )}
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
