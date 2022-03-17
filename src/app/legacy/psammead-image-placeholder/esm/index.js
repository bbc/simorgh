import _styled from '@emotion/styled/base';

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

import React from 'react';
import { number, bool, objectOf, string } from 'prop-types';
import { C_LUNAR, C_SHADOW } from '#legacy/psammead-styles/colours';
import { BBC_BLOCKS, BBC_BLOCKS_DARK_MODE } from '#legacy/psammead-assets/svgs';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/breakpoints';
export { default as ImagePlaceholderAmp } from './index.amp';
var bgImageDark = 'url(data:image/svg+xml;base64,'.concat(
  BBC_BLOCKS_DARK_MODE,
  ')',
);
var bgImageRegular = 'url(data:image/svg+xml;base64,'.concat(BBC_BLOCKS, ')');

var StyledImagePlaceholder = _styled(
  'div',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'e1whu0',
      }
    : {
        target: 'e1whu0',
        label: 'StyledImagePlaceholder',
      },
)(
  'position:relative;height:0;overflow:hidden;background-color:',
  function (_ref) {
    var darkMode = _ref.darkMode;
    return darkMode ? C_SHADOW : C_LUNAR;
  },
  ';background-position:center center;background-repeat:no-repeat;background-size:60px 17px;@media (min-width: ',
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  '){background-size:77px 22px;}@media (min-width: ',
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  '){background-size:93px 27px;}width:100%;background-image:',
  function (_ref2) {
    var darkMode = _ref2.darkMode;
    return darkMode ? bgImageDark : bgImageRegular;
  },
  ';' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZXlDIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgbnVtYmVyLCBib29sLCBvYmplY3RPZiwgc3RyaW5nIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBDX0xVTkFSLCBDX1NIQURPVyB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgQkJDX0JMT0NLUywgQkJDX0JMT0NLU19EQVJLX01PREUgfSBmcm9tICdAYmJjL3BzYW1tZWFkLWFzc2V0cy9zdmdzJztcbmltcG9ydCB7XG4gIEdFTF9HUk9VUF8yX1NDUkVFTl9XSURUSF9NSU4sXG4gIEdFTF9HUk9VUF80X1NDUkVFTl9XSURUSF9NSU4sXG59IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL2JyZWFrcG9pbnRzJztcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBJbWFnZVBsYWNlaG9sZGVyQW1wIH0gZnJvbSAnLi9pbmRleC5hbXAnO1xuXG5jb25zdCBiZ0ltYWdlRGFyayA9IGB1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCwke0JCQ19CTE9DS1NfREFSS19NT0RFfSlgO1xuY29uc3QgYmdJbWFnZVJlZ3VsYXIgPSBgdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsJHtCQkNfQkxPQ0tTfSlgO1xuXG5jb25zdCBTdHlsZWRJbWFnZVBsYWNlaG9sZGVyID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQtY29sb3I6ICR7KHsgZGFya01vZGUgfSkgPT4gKGRhcmtNb2RlID8gQ19TSEFET1cgOiBDX0xVTkFSKX07XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtc2l6ZTogNjBweCAxN3B4O1xuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUlOfSkge1xuICAgIGJhY2tncm91bmQtc2l6ZTogNzdweCAyMnB4O1xuICB9XG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF80X1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgYmFja2dyb3VuZC1zaXplOiA5M3B4IDI3cHg7XG4gIH1cbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtaW1hZ2U6ICR7KHsgZGFya01vZGUgfSkgPT5cbiAgICBkYXJrTW9kZSA/IGJnSW1hZ2VEYXJrIDogYmdJbWFnZVJlZ3VsYXJ9O1xuYDtcblxuY29uc3QgSW1hZ2VQbGFjZWhvbGRlciA9IHByb3BzID0+IHtcbiAgY29uc3QgeyBmb3J3YXJkU3R5bGUsIHJhdGlvIH0gPSBwcm9wcztcblxuICByZXR1cm4gKFxuICAgIDxTdHlsZWRJbWFnZVBsYWNlaG9sZGVyXG4gICAgICBzdHlsZT17eyBwYWRkaW5nQm90dG9tOiBgJHtyYXRpb30lYCwgLi4uKGZvcndhcmRTdHlsZSB8fCBbXSkgfX1cbiAgICAgIGRhdGEtZTJlPVwiaW1hZ2UtcGxhY2Vob2xkZXJcIlxuICAgICAgey4uLnByb3BzfVxuICAgIC8+XG4gICk7XG59O1xuXG5JbWFnZVBsYWNlaG9sZGVyLnByb3BUeXBlcyA9IHtcbiAgcmF0aW86IG51bWJlci5pc1JlcXVpcmVkLFxuICBkYXJrTW9kZTogYm9vbCxcbiAgZm9yd2FyZFN0eWxlOiBvYmplY3RPZihzdHJpbmcpLFxufTtcblxuSW1hZ2VQbGFjZWhvbGRlci5kZWZhdWx0UHJvcHMgPSB7XG4gIGRhcmtNb2RlOiBmYWxzZSxcbiAgZm9yd2FyZFN0eWxlOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VQbGFjZWhvbGRlcjtcbiJdfQ== */'),
);

var ImagePlaceholder = function ImagePlaceholder(props) {
  var forwardStyle = props.forwardStyle,
    ratio = props.ratio;
  return /*#__PURE__*/ React.createElement(
    StyledImagePlaceholder,
    _extends(
      {
        style: _objectSpread(
          {
            paddingBottom: ''.concat(ratio, '%'),
          },
          forwardStyle || [],
        ),
        'data-e2e': 'image-placeholder',
      },
      props,
    ),
  );
};

ImagePlaceholder.propTypes = {
  ratio: number.isRequired,
  darkMode: bool,
  forwardStyle: objectOf(string),
};
ImagePlaceholder.defaultProps = {
  darkMode: false,
  forwardStyle: null,
};
export default ImagePlaceholder;
