"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ampGeoData = {
  ISOCountryGroups: {
    eea: ['at', 'ax', 'be', 'bg', 'bl', 'cy', 'cz', 'de', 'dk', 'ea', 'ee', 'es', 'fi', 'fr', 'gb', 'gf', 'gg', 'gi', 'gp', 'gr', 'hr', 'hu', 'ic', 'ie', 'im', 'is', 'it', 'je', 'li', 'lt', 'lu', 'lv', 'mf', 'mq', 'mt', 'nc', 'nl', 'no', 'pf', 'pl', 'pm', 'pt', 're', 'ro', 'se', 'si', 'sj', 'sk', 'tf', 'va', 'wf', 'yt'],
    gbOrUnknown: ['gb', 'gg', 'im', 'je', 'uk', 'unknown']
  }
};

var jsonInlinedScript = function jsonInlinedScript(data) {
  return /*#__PURE__*/_react.default.createElement("script", {
    type: "application/json"
    /* eslint-disable-next-line react/no-danger */
    ,
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data)
    }
  });
};

var AmpGeo = function AmpGeo() {
  return /*#__PURE__*/_react.default.createElement("amp-geo", {
    layout: "nodisplay"
  }, jsonInlinedScript(ampGeoData));
};

var _default = AmpGeo;
exports.default = _default;