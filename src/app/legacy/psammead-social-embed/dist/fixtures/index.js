"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _instagram = _interopRequireDefault(require("./instagram.json"));

var _twitter = _interopRequireDefault(require("./twitter.json"));

var _youtube = _interopRequireDefault(require("./youtube.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  instagram: _instagram.default,
  twitter: _twitter.default,
  youtube: _youtube.default
};
exports.default = _default;