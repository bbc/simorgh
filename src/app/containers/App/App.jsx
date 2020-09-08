import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useContext,
  memo,
} from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import pipe from 'ramda/src/pipe';
import { renderRoutes } from 'react-router-config';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';
import { C_GHOST } from '@bbc/psammead-styles/colours';
import { withRouter } from 'react-router';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import usePrevious from '#lib/utilities/usePrevious';
import getToggles from '#app/lib/utilities/getToggles';
import routes from '#app/routes';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withLoading from '#containers/PageHandlers/withLoading';
import { MediaPlayerContext } from '../../contexts/MediaPlayerContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import AVPlayer from '#containers/AVPlayer';

const updatePageClientSide = async ({
  setState,
  service,
  getInitialData,
  variant,
  pageType,
  pathname,
}) => {
  const routeProps = getRouteProps(pathname);
  const [toggles, initialData] = await Promise.all([
    await getToggles(service),
    await getInitialData({
      path: pathname,
      service,
      variant,
      pageType,
    }),
  ]);

  setState({ ...initialData, ...routeProps, pathname, toggles });
};

const setFocusOnMainHeading = () => {
  const mainHeadingEl = document.querySelector('h1#content');

  if (mainHeadingEl) {
    mainHeadingEl.focus();
  }
};

const ToastWrapper = styled.div`
  left: 0;
  bottom: 0;
  width: 100%;
  position: fixed;
  background: ${C_GHOST};
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 24px 0px;
`;

const Toast = styled.div`
  width: 755px;
  max-width: 100%;
  margin: 0 auto;
`;

const AnimatedToastWrapper = animated(ToastWrapper);

const StyledAudioPlayer = memo(styled(AVPlayer)`
  width: 100%;
  amp-iframe {
    overflow: visible !important;
    width: calc(100% + ${GEL_SPACING_DBL});
    @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
      width: calc(100% + ${GEL_SPACING_QUAD});
    }
  }
  iframe {
    width: calc(100% + ${GEL_SPACING_DBL});
    margin: 0 -${GEL_SPACING};
    @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
      width: calc(100% + ${GEL_SPACING_QUAD});
      margin: 0 -${GEL_SPACING_DBL};
    }
  }
`);

const withStickyPlayer = Component => {
  return props => {
    const { showMediaPlayer, mediaPlayerProps } = useContext(
      MediaPlayerContext,
    );

    const { script, service } = useContext(ServiceContext);
    const animationStyles = useSpring({
      transform: showMediaPlayer ? 'translateY(0%)' : 'translateY(100%)',
    });
    const { heading, summary } = mediaPlayerProps || {};

    return (
      <>
        <Component {...props} />

        <AnimatedToastWrapper
          showMediaPlayer={showMediaPlayer}
          style={animationStyles}
        >
          <Toast>
            <Headline
              script={script}
              service={service}
              id="content"
              tabIndex="-1"
            >
              {heading}
            </Headline>
            <Paragraph script={script} service={service}>
              {summary}
            </Paragraph>
            {mediaPlayerProps && <StyledAudioPlayer {...mediaPlayerProps} />}
          </Toast>
        </AnimatedToastWrapper>
      </>
    );
  };
};

const Routes = pipe(
  withLoading,
  withStickyPlayer,
  withPageWrapper,
  withContexts,
)(props => renderRoutes(routes, props));

export const App = ({ location, initialData, bbcOrigin, history }) => {
  const { pathname } = location;
  const hasMounted = useRef(false);
  const routeProps = getRouteProps(pathname);
  const { service, variant, pageType, getInitialData } = routeProps;
  const previousLocationPath = usePrevious(pathname);
  const previousPath = history.action === 'POP' ? null : previousLocationPath; // clear the previous path on back clicks
  const [state, setState] = useState({
    ...initialData,
    ...routeProps,
    pathname,
    errorCode: routeProps.errorCode || initialData.errorCode, // wat
  });
  const isTransitioningRoutes = state.pathname !== pathname;

  useEffect(() => {
    if (hasMounted.current) {
      updatePageClientSide({
        setState,
        service,
        getInitialData,
        variant,
        pageType,
        pathname,
      });
    } else {
      hasMounted.current = true;
    }
  }, [service, getInitialData, variant, pageType, pathname]);

  useLayoutEffect(() => {
    if (hasMounted.current) {
      if (isTransitioningRoutes) {
        window.scrollTo(0, 0);
      } else {
        setFocusOnMainHeading();
      }
    }
  }, [isTransitioningRoutes]);

  return (
    <Routes
      {...state}
      bbcOrigin={bbcOrigin}
      previousPath={previousPath}
      loading={isTransitioningRoutes}
    />
  );
};

export default withRouter(App);
