"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _dompurify = _interopRequireDefault(require("dompurify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOMPURIFY_CONFIG = {
  ADD_TAGS: ['iframe']
};

var OEmbed = function OEmbed(_ref) {
  var oEmbed = _ref.oEmbed,
      className = _ref.className;
  var html = oEmbed.html;

  var sanitizedHtml = _dompurify.default.sanitize(html, DOMPURIFY_CONFIG);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: className // eslint-disable-next-line react/no-danger
    ,
    dangerouslySetInnerHTML: {
      __html: sanitizedHtml
    }
  });
};

OEmbed.defaultProps = {
  className: null
};
OEmbed.propTypes = {
  oEmbed: (0, _propTypes.shape)({
    html: _propTypes.string.isRequired
  }).isRequired,
  className: _propTypes.string
};
var _default = OEmbed;
exports.default = _default;