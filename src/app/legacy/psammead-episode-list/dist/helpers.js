"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withEpisodeContext = exports.EpisodeContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Used to make props passed to <EpisodeList> available to children
var EpisodeContext = /*#__PURE__*/_react.default.createContext({});

exports.EpisodeContext = EpisodeContext;

var withEpisodeContext = function withEpisodeContext(Component) {
  return function (props) {
    return /*#__PURE__*/_react.default.createElement(EpisodeContext.Consumer, null, function (context) {
      return /*#__PURE__*/_react.default.createElement(Component, _extends({}, context, props));
    });
  };
};

exports.withEpisodeContext = withEpisodeContext;