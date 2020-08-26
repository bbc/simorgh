import React, { useContext, useState, useEffect } from 'react';
import { bool, element } from 'prop-types';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';
import Skeleton from 'react-loading-skeleton';
import { GridWrapper, GridItemConstrainedMedium } from '#lib/styledGrid';
import { ServiceContext } from '#contexts/ServiceContext';

const StyledMain = styled.main`
  min-height: 1000px;
`;

let timeout;

const WithLoading = Component => {
  const LoadingContainer = ({ loading, ...props }) => {
    const [showSkeleton, setShowSkeleton] = useState(false);
    const { script, service } = useContext(ServiceContext);

    useEffect(() => {
      timeout = setTimeout(() => {
        setShowSkeleton(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }, []);

    if (!loading) {
      debugger;
      return <Component {...props} />;
    }

    debugger;
    return (
      <StyledMain role="main">
        <GridWrapper>
          <GridItemConstrainedMedium>
            {showSkeleton && (
              <>
                <Headline
                  script={script}
                  service={service}
                  id="content"
                  tabIndex="0"
                >
                  <Skeleton count="2" />
                </Headline>
                <Paragraph script={script} service={service} tabIndex="0">
                  <Skeleton count="4" />
                </Paragraph>
              </>
            )}
          </GridItemConstrainedMedium>
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
