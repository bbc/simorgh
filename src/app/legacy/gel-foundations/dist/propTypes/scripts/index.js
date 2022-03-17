"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = require("prop-types");

var _groups = _interopRequireDefault(require("./groups"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scriptPropTypes = {
  canon: (0, _propTypes.shape)(_groups.default).isRequired,
  trafalgar: (0, _propTypes.shape)(_groups.default).isRequired,
  paragon: (0, _propTypes.shape)(_groups.default).isRequired,
  doublePica: (0, _propTypes.shape)(_groups.default).isRequired,
  greatPrimer: (0, _propTypes.shape)(_groups.default).isRequired,
  bodyCopy: (0, _propTypes.shape)(_groups.default).isRequired,
  pica: (0, _propTypes.shape)(_groups.default).isRequired,
  longPrimer: (0, _propTypes.shape)(_groups.default).isRequired,
  brevier: (0, _propTypes.shape)(_groups.default).isRequired,
  minion: (0, _propTypes.shape)(_groups.default).isRequired
};
var _default = scriptPropTypes;
exports.default = _default;