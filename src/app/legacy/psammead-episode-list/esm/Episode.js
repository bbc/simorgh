import _styled from '@emotion/styled/base';
import React, { Children, cloneElement } from 'react';
import { node, string } from 'prop-types';
import { GEL_SPACING_DBL } from '#legacy/gel-foundations/spacings';
import tail from 'ramda/src/tail';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/breakpoints';
import pathOr from 'ramda/src/pathOr';
import Image from './Image';
import { withEpisodeContext } from './helpers';

var Wrapper = _styled(
  'div',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'emzt7w81',
      }
    : {
        target: 'emzt7w81',
        label: 'Wrapper',
      },
)(
  'position:relative;',
  function (_ref) {
    var showMediaIndicator = _ref.showMediaIndicator,
      dir = _ref.dir;
    return (
      showMediaIndicator &&
      'padding-'.concat(dir === 'ltr' ? 'left' : 'right', ': 4rem;')
    );
  },
  ';' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9FcGlzb2RlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhMEIiLCJmaWxlIjoiLi4vc3JjL0VwaXNvZGUuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENoaWxkcmVuLCBjbG9uZUVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBub2RlLCBzdHJpbmcgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEdFTF9TUEFDSU5HX0RCTCB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcbmltcG9ydCB0YWlsIGZyb20gJ3JhbWRhL3NyYy90YWlsJztcbmltcG9ydCB7XG4gIEdFTF9HUk9VUF8yX1NDUkVFTl9XSURUSF9NSU4sXG4gIEdFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU4sXG59IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL2JyZWFrcG9pbnRzJztcbmltcG9ydCBwYXRoT3IgZnJvbSAncmFtZGEvc3JjL3BhdGhPcic7XG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi9JbWFnZSc7XG5pbXBvcnQgeyB3aXRoRXBpc29kZUNvbnRleHQgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAkeyh7IHNob3dNZWRpYUluZGljYXRvciwgZGlyIH0pID0+XG4gICAgc2hvd01lZGlhSW5kaWNhdG9yICYmIGBwYWRkaW5nLSR7ZGlyID09PSAnbHRyJyA/ICdsZWZ0JyA6ICdyaWdodCd9OiA0cmVtO2B9XG5gO1xuXG5jb25zdCBUZXh0V3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSA0LjM3NXJlbSAtICR7R0VMX1NQQUNJTkdfREJMfSk7XG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8yX1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSA3LjVyZW0gLSAke0dFTF9TUEFDSU5HX0RCTH0pO1xuICB9XG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSAxNC4zNzVyZW0gLSAke0dFTF9TUEFDSU5HX0RCTH0pO1xuICB9XG5gO1xuXG5jb25zdCBFcGlzb2RlID0gKHsgY2hpbGRyZW4sIGRpciB9KSA9PiB7XG4gIGNvbnN0IHNob3dNZWRpYUluZGljYXRvciA9IHBhdGhPcih7fSwgJzAnLCBjaGlsZHJlbikudHlwZSAhPT0gSW1hZ2U7XG5cbiAgcmV0dXJuIChcbiAgICA8V3JhcHBlciBkaXI9e2Rpcn0gc2hvd01lZGlhSW5kaWNhdG9yPXtzaG93TWVkaWFJbmRpY2F0b3J9PlxuICAgICAge3Nob3dNZWRpYUluZGljYXRvciA/IChcbiAgICAgICAgQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbilcbiAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgLm1hcChjaGlsZCA9PiBjbG9uZUVsZW1lbnQoY2hpbGQsIHsgc2hvd01lZGlhSW5kaWNhdG9yIH0pKVxuICAgICAgKSA6IChcbiAgICAgICAgPD5cbiAgICAgICAgICB7Y2xvbmVFbGVtZW50KGNoaWxkcmVuWzBdLCB7IGRpciB9KX1cbiAgICAgICAgICA8VGV4dFdyYXBwZXI+e3RhaWwoY2hpbGRyZW4pfTwvVGV4dFdyYXBwZXI+XG4gICAgICAgIDwvPlxuICAgICAgKX1cbiAgICA8L1dyYXBwZXI+XG4gICk7XG59O1xuXG5FcGlzb2RlLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IG5vZGUuaXNSZXF1aXJlZCxcbiAgZGlyOiBzdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhFcGlzb2RlQ29udGV4dChFcGlzb2RlKTtcbiJdfQ== */'),
);

var TextWrapper = _styled(
  'div',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'emzt7w80',
      }
    : {
        target: 'emzt7w80',
        label: 'TextWrapper',
      },
)(
  'display:inline-block;max-width:calc(100% - 4.375rem - ',
  GEL_SPACING_DBL,
  ');vertical-align:top;@media (min-width: ',
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  '){max-width:calc(100% - 7.5rem - ',
  GEL_SPACING_DBL,
  ');}@media (min-width: ',
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  '){max-width:calc(100% - 14.375rem - ',
  GEL_SPACING_DBL,
  ');}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9FcGlzb2RlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtQjhCIiwiZmlsZSI6Ii4uL3NyYy9FcGlzb2RlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDaGlsZHJlbiwgY2xvbmVFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgbm9kZSwgc3RyaW5nIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBHRUxfU1BBQ0lOR19EQkwgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgdGFpbCBmcm9tICdyYW1kYS9zcmMvdGFpbCc7XG5pbXBvcnQge1xuICBHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUlOLFxuICBHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUlOLFxufSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5pbXBvcnQgcGF0aE9yIGZyb20gJ3JhbWRhL3NyYy9wYXRoT3InO1xuaW1wb3J0IEltYWdlIGZyb20gJy4vSW1hZ2UnO1xuaW1wb3J0IHsgd2l0aEVwaXNvZGVDb250ZXh0IH0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgJHsoeyBzaG93TWVkaWFJbmRpY2F0b3IsIGRpciB9KSA9PlxuICAgIHNob3dNZWRpYUluZGljYXRvciAmJiBgcGFkZGluZy0ke2RpciA9PT0gJ2x0cicgPyAnbGVmdCcgOiAncmlnaHQnfTogNHJlbTtgfVxuYDtcblxuY29uc3QgVGV4dFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1heC13aWR0aDogY2FsYygxMDAlIC0gNC4zNzVyZW0gLSAke0dFTF9TUEFDSU5HX0RCTH0pO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUlOfSkge1xuICAgIG1heC13aWR0aDogY2FsYygxMDAlIC0gNy41cmVtIC0gJHtHRUxfU1BBQ0lOR19EQkx9KTtcbiAgfVxuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUlOfSkge1xuICAgIG1heC13aWR0aDogY2FsYygxMDAlIC0gMTQuMzc1cmVtIC0gJHtHRUxfU1BBQ0lOR19EQkx9KTtcbiAgfVxuYDtcblxuY29uc3QgRXBpc29kZSA9ICh7IGNoaWxkcmVuLCBkaXIgfSkgPT4ge1xuICBjb25zdCBzaG93TWVkaWFJbmRpY2F0b3IgPSBwYXRoT3Ioe30sICcwJywgY2hpbGRyZW4pLnR5cGUgIT09IEltYWdlO1xuXG4gIHJldHVybiAoXG4gICAgPFdyYXBwZXIgZGlyPXtkaXJ9IHNob3dNZWRpYUluZGljYXRvcj17c2hvd01lZGlhSW5kaWNhdG9yfT5cbiAgICAgIHtzaG93TWVkaWFJbmRpY2F0b3IgPyAoXG4gICAgICAgIENoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pXG4gICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgIC5tYXAoY2hpbGQgPT4gY2xvbmVFbGVtZW50KGNoaWxkLCB7IHNob3dNZWRpYUluZGljYXRvciB9KSlcbiAgICAgICkgOiAoXG4gICAgICAgIDw+XG4gICAgICAgICAge2Nsb25lRWxlbWVudChjaGlsZHJlblswXSwgeyBkaXIgfSl9XG4gICAgICAgICAgPFRleHRXcmFwcGVyPnt0YWlsKGNoaWxkcmVuKX08L1RleHRXcmFwcGVyPlxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgPC9XcmFwcGVyPlxuICApO1xufTtcblxuRXBpc29kZS5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBub2RlLmlzUmVxdWlyZWQsXG4gIGRpcjogc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoRXBpc29kZUNvbnRleHQoRXBpc29kZSk7XG4iXX0= */'),
);

var Episode = function Episode(_ref2) {
  var children = _ref2.children,
    dir = _ref2.dir;
  var showMediaIndicator = pathOr({}, '0', children).type !== Image;
  return /*#__PURE__*/ React.createElement(
    Wrapper,
    {
      dir: dir,
      showMediaIndicator: showMediaIndicator,
    },
    showMediaIndicator
      ? Children.toArray(children)
          .filter(Boolean)
          .map(function (child) {
            return /*#__PURE__*/ cloneElement(child, {
              showMediaIndicator: showMediaIndicator,
            });
          })
      : /*#__PURE__*/ React.createElement(
          React.Fragment,
          null,
          /*#__PURE__*/ cloneElement(children[0], {
            dir: dir,
          }),
          /*#__PURE__*/ React.createElement(TextWrapper, null, tail(children)),
        ),
  );
};

Episode.propTypes = {
  children: node.isRequired,
  dir: string.isRequired,
};
export default withEpisodeContext(Episode);
