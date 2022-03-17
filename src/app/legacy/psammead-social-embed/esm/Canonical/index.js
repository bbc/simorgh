import _styled from "@emotion/styled/base";

/* eslint-disable no-console */
import React, { memo, useEffect } from 'react';
import { func, shape, string } from 'prop-types';
import useScript from './useScript';
var LANDSCAPE_RATIO = '56.25%';
var PRE_RENDER_MARGIN = '10rem';
/**
 * Apply provider-specific styles.
 */

var OEmbed = _styled("div", process.env.NODE_ENV === "production" ? {
  target: "e181078e0"
} : {
  target: "e181078e0",
  label: "OEmbed"
})(function (_ref) {
  var styles = _ref.styles;
  return styles;
}, " display:flex;justify-content:center;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DYW5vbmljYWwvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVl5QiIsImZpbGUiOiIuLi8uLi9zcmMvQ2Fub25pY2FsL2luZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmltcG9ydCBSZWFjdCwgeyBtZW1vLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBmdW5jLCBzaGFwZSwgc3RyaW5nIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgdXNlU2NyaXB0IGZyb20gJy4vdXNlU2NyaXB0JztcblxuY29uc3QgTEFORFNDQVBFX1JBVElPID0gJzU2LjI1JSc7XG5jb25zdCBQUkVfUkVOREVSX01BUkdJTiA9ICcxMHJlbSc7XG5cbi8qKlxuICogQXBwbHkgcHJvdmlkZXItc3BlY2lmaWMgc3R5bGVzLlxuICovXG5jb25zdCBPRW1iZWQgPSBzdHlsZWQuZGl2YFxuICAkeyh7IHN0eWxlcyB9KSA9PiBzdHlsZXN9XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuYDtcblxuY29uc3QgZ2V0T25SZW5kZXJFcnJvciA9IHByb3ZpZGVyTmFtZSA9PlxuICBgb25SZW5kZXIgY2FsbGJhY2sgZnVuY3Rpb24gbm90IGltcGxlbWVudGVkIGZvciAke3Byb3ZpZGVyTmFtZX1gO1xuXG4vKipcbiAqIFRoZSBmb2xsb3dpbmcgb2JqZWN0IGRlY2xhcmVzIGEgbGlzdCBvZiBzdXBwb3J0ZWQgQ2Fub25pY2FsIHByb3ZpZGVyc1xuICogYW5kIHRoZWlyIGF0dHJpYnV0ZXMuIE5vdCBhbGwgcHJvdmlkZXJzIGhhdmUgdGhlIHNhbWUgYXR0cmlidXRlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IHByb3ZpZGVycyA9IHtcbiAgaW5zdGFncmFtOiB7XG4gICAgc2NyaXB0OiAnaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9lbWJlZC5qcycsXG4gICAgc3R5bGVzOiBgXG4gICAgICAuaW5zdGFncmFtLW1lZGlhIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMCAhaW1wb3J0YW50O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwICFpbXBvcnRhbnQ7XG4gICAgICAgIG1pbi13aWR0aDogYXV0byAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgIGAsXG4gICAgZW5yaWNoOiAoKSA9PiB7XG4gICAgICBpZiAod2luZG93Lmluc3Rncm0pIHtcbiAgICAgICAgd2luZG93Lmluc3Rncm0uRW1iZWRzLnByb2Nlc3MoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uTGlicmFyeUxvYWQ6ICgpID0+IGNvbnNvbGUuZXJyb3IoZ2V0T25SZW5kZXJFcnJvcignSW5zdGFncmFtJykpLFxuICB9LFxuICB0d2l0dGVyOiB7XG4gICAgc2NyaXB0OiAnaHR0cHM6Ly9wbGF0Zm9ybS50d2l0dGVyLmNvbS93aWRnZXRzLmpzJyxcbiAgICBzdHlsZXM6IGBcbiAgICAgIC50d2l0dGVyLXR3ZWV0IHtcbiAgICAgICAgbWFyZ2luLXRvcDogMCAhaW1wb3J0YW50O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke1BSRV9SRU5ERVJfTUFSR0lOfSAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgLnR3aXR0ZXItdHdlZXQtcmVuZGVyZWQge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwICFpbXBvcnRhbnQ7XG4gICAgICB9XG4gICAgYCxcbiAgICBlbnJpY2g6ICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cudHd0dHIpIHtcbiAgICAgICAgd2luZG93LnR3dHRyLndpZGdldHMubG9hZCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgb25MaWJyYXJ5TG9hZDogb25SZW5kZXIgPT4ge1xuICAgICAgd2luZG93LnR3dHRyLnJlYWR5KHR3dHRyID0+IHtcbiAgICAgICAgdHd0dHIuZXZlbnRzLmJpbmQoJ3JlbmRlcmVkJywgb25SZW5kZXIpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbiAgeW91dHViZToge1xuICAgIHN0eWxlczogYFxuICAgICAgcGFkZGluZy10b3A6ICR7TEFORFNDQVBFX1JBVElPfTtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgICAgID4gaWZyYW1lIHtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cbiAgICBgLFxuICAgIGVucmljaDogKCkgPT4ge30sXG4gICAgb25MaWJyYXJ5TG9hZDogKCkgPT4gY29uc29sZS5lcnJvcihnZXRPblJlbmRlckVycm9yKCdZb3VUdWJlJykpLFxuICB9LFxufTtcblxuY29uc3QgQ2Fub25pY2FsRW1iZWQgPSAoeyBwcm92aWRlciwgb0VtYmVkLCBvblJlbmRlciB9KSA9PiB7XG4gIGNvbnN0IGhhc0xvYWRlZExpYnJhcnkgPSB1c2VTY3JpcHQocHJvdmlkZXJzW3Byb3ZpZGVyXS5zY3JpcHQpO1xuICB1c2VFZmZlY3QocHJvdmlkZXJzW3Byb3ZpZGVyXS5lbnJpY2gpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgeyBvbkxpYnJhcnlMb2FkIH0gPSBwcm92aWRlcnNbcHJvdmlkZXJdO1xuXG4gICAgaWYgKG9uUmVuZGVyICYmIGhhc0xvYWRlZExpYnJhcnkgJiYgb25MaWJyYXJ5TG9hZCkge1xuICAgICAgb25MaWJyYXJ5TG9hZChvblJlbmRlcik7XG4gICAgfVxuICB9LCBbaGFzTG9hZGVkTGlicmFyeV0pO1xuXG4gIHJldHVybiAoXG4gICAgPE9FbWJlZFxuICAgICAgc3R5bGVzPXtwcm92aWRlcnNbcHJvdmlkZXJdLnN0eWxlc31cbiAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogb0VtYmVkLmh0bWwgfX1cbiAgICAvPlxuICApO1xufTtcblxuQ2Fub25pY2FsRW1iZWQucHJvcFR5cGVzID0ge1xuICBwcm92aWRlcjogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9FbWJlZDogc2hhcGUoe1xuICAgIGh0bWw6IHN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBvblJlbmRlcjogZnVuYyxcbn07XG5cbkNhbm9uaWNhbEVtYmVkLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25SZW5kZXI6IG51bGwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZW1vKENhbm9uaWNhbEVtYmVkKTtcbiJdfQ== */"));

var getOnRenderError = function getOnRenderError(providerName) {
  return "onRender callback function not implemented for ".concat(providerName);
};
/**
 * The following object declares a list of supported Canonical providers
 * and their attributes. Not all providers have the same attributes.
 */


export var providers = {
  instagram: {
    script: 'https://www.instagram.com/embed.js',
    styles: "\n      .instagram-media {\n        margin-top: 0 !important;\n        margin-bottom: 0 !important;\n        min-width: auto !important;\n      }\n    ",
    enrich: function enrich() {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    },
    onLibraryLoad: function onLibraryLoad() {
      return console.error(getOnRenderError('Instagram'));
    }
  },
  twitter: {
    script: 'https://platform.twitter.com/widgets.js',
    styles: "\n      .twitter-tweet {\n        margin-top: 0 !important;\n        margin-bottom: ".concat(PRE_RENDER_MARGIN, " !important;\n      }\n      .twitter-tweet-rendered {\n        margin-bottom: 0 !important;\n      }\n    "),
    enrich: function enrich() {
      if (window.twttr) {
        window.twttr.widgets.load();
      }
    },
    onLibraryLoad: function onLibraryLoad(onRender) {
      window.twttr.ready(function (twttr) {
        twttr.events.bind('rendered', onRender);
      });
    }
  },
  youtube: {
    styles: "\n      padding-top: ".concat(LANDSCAPE_RATIO, ";\n      position: relative;\n      overflow: hidden;\n\n      > iframe {\n        border: none;\n        height: 100%;\n        left: 0;\n        position: absolute;\n        top: 0;\n        width: 100%;\n      }\n    "),
    enrich: function enrich() {},
    onLibraryLoad: function onLibraryLoad() {
      return console.error(getOnRenderError('YouTube'));
    }
  }
};

var CanonicalEmbed = function CanonicalEmbed(_ref2) {
  var provider = _ref2.provider,
      oEmbed = _ref2.oEmbed,
      onRender = _ref2.onRender;
  var hasLoadedLibrary = useScript(providers[provider].script);
  useEffect(providers[provider].enrich);
  useEffect(function () {
    var onLibraryLoad = providers[provider].onLibraryLoad;

    if (onRender && hasLoadedLibrary && onLibraryLoad) {
      onLibraryLoad(onRender);
    }
  }, [hasLoadedLibrary]);
  return /*#__PURE__*/React.createElement(OEmbed, {
    styles: providers[provider].styles,
    dangerouslySetInnerHTML: {
      __html: oEmbed.html
    }
  });
};

CanonicalEmbed.propTypes = {
  provider: string.isRequired,
  oEmbed: shape({
    html: string.isRequired
  }).isRequired,
  onRender: func
};
CanonicalEmbed.defaultProps = {
  onRender: null
};
export default /*#__PURE__*/memo(CanonicalEmbed);