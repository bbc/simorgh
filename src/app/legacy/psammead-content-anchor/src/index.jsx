import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import when from 'ramda/src/when';
import is from 'ramda/src/is';
import { number, string, node, oneOfType } from 'prop-types';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const GlobalStyle = () => (
  <Global
    styles={css`
      body {
        overflow-anchor: auto;
      }
    `}
  />
);

const convertToPixels = num => `${num}px`;

const getSize = when(is(Number), convertToPixels);

const getHeight = ({ wrapperHeight }) => getSize(wrapperHeight);

const getWidth = ({ wrapperWidth }) => getSize(wrapperWidth);

const calculateNewScrollY = ({
  prevScrollHeight,
  currentScrollHeight,
  currentScrollY,
}) => {
  const scrollHeightDiff = prevScrollHeight - currentScrollHeight;

  if (scrollHeightDiff !== 0) {
    return currentScrollY - scrollHeightDiff;
  }
  return null;
};

const Wrapper = styled.div`
  overflow: auto;
  height: ${getHeight};
  width: ${getWidth};
`;

const initIntersectionObserver = ({ wrapperEl, setWrapperIO }) => {
  const init = () => {
    const callback = ([wrapperEntry]) => {
      setWrapperIO(wrapperEntry);
    };
    const IO = new IntersectionObserver(callback);

    IO.observe(wrapperEl.current);

    return IO;
  };

  if ('IntersectionObserver' in window) {
    return init();
  }

  return import(
    /* webpackChunkName: "intersection-observer-polyfill" */ 'intersection-observer'
  ).then(() => {
    IntersectionObserver.prototype.POLL_INTERVAL = 100;
    return init();
  });
};

const initResizeObserver = ({ wrapperEl, setContentElRect }) => {
  const init = ResizeObserver => {
    const callback = ([contentEntry]) => {
      setContentElRect(contentEntry.contentRect);
    };
    const RO = new ResizeObserver(callback);

    RO.observe(wrapperEl.current.firstChild);

    return RO;
  };

  if ('ResizeObserver' in window) {
    return init(ResizeObserver);
  }
  return import(
    /* webpackChunkName: "resize-observer-polyfill" */ '@juggle/resize-observer'
  ).then(module => {
    const ResizeObserver = module.default;
    return init(ResizeObserver);
  });
};

const isScrollAnchoringSupported = () => {
  // https://drafts.csswg.org/css-scroll-anchoring/
  if ('CSS' in window) {
    return CSS.supports('overflow-anchor', 'auto');
  }
  return false;
};

const ContentAnchor = ({ children, initialHeight, initialWidth }) => {
  const wrapperEl = useRef(null);
  const scrollHeight = useRef(null);
  const scrollAnchoringIsSupported = useRef(null);
  const [wrapperIO, setWrapperIO] = useState({});
  const [contentElRect, setContentElRect] = useState({});
  const [wrapperDimensions, setWrapperDimensions] = useState({
    height: initialHeight,
    width: initialWidth,
  });

  useEffect(() => {
    // component did mount
    const IO = initIntersectionObserver({ wrapperEl, setWrapperIO });
    const RO = initResizeObserver({ wrapperEl, setContentElRect });
    scrollAnchoringIsSupported.current = isScrollAnchoringSupported();

    return function cleanup() {
      IO.disconnect();
      RO.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    // child content did resize
    const wrapperIsOutOfView = wrapperIO.isIntersecting === false;

    if (wrapperIsOutOfView) {
      // wrapper will resize
      const wrapperIsAboveViewport = wrapperIO.boundingClientRect.top < 0;
      const {
        width: nextWrapperWidth,
        height: nextWrapperHeight,
      } = contentElRect;

      if (!scrollAnchoringIsSupported.current && wrapperIsAboveViewport) {
        scrollHeight.current = document.body.scrollHeight;
      }

      setWrapperDimensions({
        width: nextWrapperWidth,
        height: nextWrapperHeight,
      });
    }
  }, [contentElRect]);

  useLayoutEffect(() => {
    // wrapper did resize
    if (scrollAnchoringIsSupported.current || scrollHeight.current === null) {
      return;
    }

    const { scrollHeight: currentScrollHeight } = document.body;
    const { current: prevScrollHeight } = scrollHeight;
    const currentScrollY = window.pageYOffset;
    const newScrollY = calculateNewScrollY({
      prevScrollHeight,
      currentScrollHeight,
      currentScrollY,
    });

    if (newScrollY) {
      // adjust scrollY position to prevent visible jump
      window.scrollTo(0, newScrollY);
    }
  }, [wrapperDimensions]);

  return (
    <>
      <GlobalStyle />
      <Wrapper
        wrapperWidth={wrapperDimensions.width}
        wrapperHeight={wrapperDimensions.height}
        ref={wrapperEl}
      >
        {children}
      </Wrapper>
    </>
  );
};

ContentAnchor.propTypes = {
  children: node.isRequired,
  initialHeight: oneOfType([number, string]),
  initialWidth: oneOfType([number, string]),
};

ContentAnchor.defaultProps = {
  initialHeight: 'auto',
  initialWidth: 'auto',
};

export default ContentAnchor;
