"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = require("prop-types");

var _sizes = _interopRequireDefault(require("./sizes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groupPropTypes = {
  groupA: (0, _propTypes.shape)(_sizes.default).isRequired,
  groupB: (0, _propTypes.shape)(_sizes.default).isRequired,
  groupD: (0, _propTypes.shape)(_sizes.default).isRequired
};
var _default = groupPropTypes;
exports.default = _default;