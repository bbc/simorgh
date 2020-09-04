import React, { useContext, useState, useEffect } from 'react';
import { bool, element } from 'prop-types';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';
import { useSpring, useTransition, animated } from 'react-spring';
import Skeleton from 'react-loading-skeleton';
import { GridWrapper, GridItemConstrainedMedium } from '#lib/styledGrid';
import { ServiceContext } from '#contexts/ServiceContext';

let timeout;

const WithLoading = Component => {
  const LoadingContainer = ({ loading, ...props }) => {
    const [showSkeleton, setShowSkeleton] = useState(false);
    const { script, service } = useContext(ServiceContext);
    const transitions = useTransition(loading, null, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { display: 'none' },
    });
    const skeletonTransition = useSpring({
      opacity: showSkeleton ? 1 : 0,
    });

    useEffect(() => {
      if (loading) {
        timeout = setTimeout(() => {
          setShowSkeleton(true);
        }, 500);
      }
      return () => clearTimeout(timeout);
    }, [loading]);

    return transitions.map(({ item, props: animProps }) =>
      item ? (
        <animated.div style={animProps}>
          <main role="main">
            <GridWrapper>
              <GridItemConstrainedMedium>
                {showSkeleton && (
                  <animated.div style={skeletonTransition}>
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
                  </animated.div>
                )}
              </GridItemConstrainedMedium>
            </GridWrapper>
          </main>
        </animated.div>
      ) : (
        <Component {...props} />
      ),
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
