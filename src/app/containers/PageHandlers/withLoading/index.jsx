import React, { useEffect, useRef, useState } from 'react';
import { bool, string, element } from 'prop-types';
import styled from '@emotion/styled';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import Skeleton from './Skeleton';

import { GridWrapper, GridItemLarge } from '#app/components/Grid';

let timeout;
const LoadingMain = styled.main`
  min-height: 100vh;
`;
const SkeletonWrapper = styled.div`
  margin-top: ${GEL_SPACING_DBL};
`;
const LoadingMessageWrapper = styled.div`
  outline: 0;
`;

const WithLoading = Component => {
  const LoadingContainer = ({ loading, ...props }) => {
    const loadingMessageRef = useRef();
    const [showSkeleton, setShowSkeleton] = useState(false);
    const { pageType } = props;

    useEffect(() => {
      if (loading) {
        timeout = setTimeout(() => {
          if (['article', 'MAP', 'STY'].includes(pageType)) {
            setShowSkeleton(true);
          }
          if (loadingMessageRef.current) {
            loadingMessageRef.current.focus();
            window.scrollTo(0, 0);
          }
        }, 500);
      }

      return () => {
        clearTimeout(timeout);
      };
    }, [loading, pageType]);

    if (!loading) return <Component {...props} />;

    return (
      <LoadingMain role="main">
        <GridWrapper>
          <GridItemLarge>
            <LoadingMessageWrapper
              tabIndex="-1"
              ref={loadingMessageRef}
              data-testid="loading"
            >
              <VisuallyHiddenText>Loading next page.</VisuallyHiddenText>
            </LoadingMessageWrapper>
            {showSkeleton && (
              <SkeletonWrapper data-testid="loading-skeleton">
                <Skeleton />
              </SkeletonWrapper>
            )}
          </GridItemLarge>
        </GridWrapper>
      </LoadingMain>
    );
  };

  LoadingContainer.propTypes = {
    loading: bool,
    pageType: string.isRequired,
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
