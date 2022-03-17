function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react'; // Used to make props passed to <EpisodeList> available to children

export var EpisodeContext = /*#__PURE__*/React.createContext({});
export var withEpisodeContext = function withEpisodeContext(Component) {
  return function (props) {
    return /*#__PURE__*/React.createElement(EpisodeContext.Consumer, null, function (context) {
      return /*#__PURE__*/React.createElement(Component, _extends({}, context, props));
    });
  };
};