"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GEL_MINION = exports.GEL_BREVIER = exports.GEL_LONG_PRIMER = exports.GEL_PICA = exports.GEL_BODY_COPY = exports.GEL_GREAT_PRIMER = exports.GEL_DOUBLE_PICA = exports.GEL_PARAGON = exports.GEL_TRAFALGAR = exports.GEL_CANON = exports.GEL_FOOLSCAP = exports.GEL_ROYAL = exports.GEL_IMPERIAL = exports.GEL_ELEPHANT = exports.GEL_ATLAS = exports.getMinion = exports.getBrevier = exports.getLongPrimer = exports.getPica = exports.getBodyCopy = exports.getGreatPrimer = exports.getDoublePica = exports.getParagon = exports.getTrafalgar = exports.getCanon = exports.getFoolscap = exports.getRoyal = exports.getImperial = exports.getElephant = exports.getAtlas = exports.GEL_FF_REITH_SANS_COND = exports.GEL_FF_REITH_SANS = exports.GEL_FF_REITH_SERIF = void 0;

var _breakpoints = require("./breakpoints");

var _getTypeSizes = _interopRequireDefault(require("./getTypeSizes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fontFamilyBase = ', Helvetica, Arial, sans-serif';
var GEL_FF_REITH_SERIF = "ReithSerif".concat(fontFamilyBase);
exports.GEL_FF_REITH_SERIF = GEL_FF_REITH_SERIF;
var GEL_FF_REITH_SANS = "ReithSans".concat(fontFamilyBase);
exports.GEL_FF_REITH_SANS = GEL_FF_REITH_SANS;
var GEL_FF_REITH_SANS_COND = "ReithSansCondensed".concat(fontFamilyBase);
exports.GEL_FF_REITH_SANS_COND = GEL_FF_REITH_SANS_COND;

var getAtlas = function getAtlas(script) {
  return (0, _getTypeSizes.default)('atlas', script);
};

exports.getAtlas = getAtlas;

var getElephant = function getElephant(script) {
  return (0, _getTypeSizes.default)('elephant', script);
};

exports.getElephant = getElephant;

var getImperial = function getImperial(script) {
  return (0, _getTypeSizes.default)('imperial', script);
};

exports.getImperial = getImperial;

var getRoyal = function getRoyal(script) {
  return (0, _getTypeSizes.default)('royal', script);
};

exports.getRoyal = getRoyal;

var getFoolscap = function getFoolscap(script) {
  return (0, _getTypeSizes.default)('foolscap', script);
};

exports.getFoolscap = getFoolscap;

var getCanon = function getCanon(script) {
  return (0, _getTypeSizes.default)('canon', script);
};

exports.getCanon = getCanon;

var getTrafalgar = function getTrafalgar(script) {
  return (0, _getTypeSizes.default)('trafalgar', script);
};

exports.getTrafalgar = getTrafalgar;

var getParagon = function getParagon(script) {
  return (0, _getTypeSizes.default)('paragon', script);
};

exports.getParagon = getParagon;

var getDoublePica = function getDoublePica(script) {
  return (0, _getTypeSizes.default)('doublePica', script);
};

exports.getDoublePica = getDoublePica;

var getGreatPrimer = function getGreatPrimer(script) {
  return (0, _getTypeSizes.default)('greatPrimer', script);
};

exports.getGreatPrimer = getGreatPrimer;

var getBodyCopy = function getBodyCopy(script) {
  return (0, _getTypeSizes.default)('bodyCopy', script);
};

exports.getBodyCopy = getBodyCopy;

var getPica = function getPica(script) {
  return (0, _getTypeSizes.default)('pica', script);
};

exports.getPica = getPica;

var getLongPrimer = function getLongPrimer(script) {
  return (0, _getTypeSizes.default)('longPrimer', script);
};

exports.getLongPrimer = getLongPrimer;

var getBrevier = function getBrevier(script) {
  return (0, _getTypeSizes.default)('brevier', script);
};

exports.getBrevier = getBrevier;

var getMinion = function getMinion(script) {
  return (0, _getTypeSizes.default)('minion', script);
};
/* ORIGINAL CONSTANTS */


exports.getMinion = getMinion;
var GEL_ATLAS = "\n  font-size: 4.875rem;\n  line-height: 5.25rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 6rem;\n    line-height: 6.5rem;\n  }\n\n  ").concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 8.75rem;\n    line-height: 9.25rem;\n  }\n");
exports.GEL_ATLAS = GEL_ATLAS;
var GEL_ELEPHANT = "\n  font-size: 3.75rem;\n  line-height: 4rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 4.875rem;\n    line-height: 5.25rem;\n  }\n\n  ").concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 7.25rem;\n    line-height: 7.75rem;\n  }\n");
exports.GEL_ELEPHANT = GEL_ELEPHANT;
var GEL_IMPERIAL = "\n  font-size: 3.125rem;\n  line-height: 3.375rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 4rem;\n    line-height: 4.5rem;\n  }\n\n  ").concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 6rem;\n    line-height: 6.5rem;\n  }\n");
exports.GEL_IMPERIAL = GEL_IMPERIAL;
var GEL_ROYAL = "\n  font-size: 2.5rem;\n  line-height: 2.75rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 3.25rem;\n    line-height: 3.75rem;\n  }\n\n  ").concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 4.75rem;\n    line-height: 5.25rem;\n  }\n");
exports.GEL_ROYAL = GEL_ROYAL;
var GEL_FOOLSCAP = "\n  font-size: 2rem;\n  line-height: 2.25rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 2.5rem;\n    line-height: 2.75rem;\n  }\n\n  ").concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 3.5rem;\n    line-height: 3.75rem;\n  }\n");
exports.GEL_FOOLSCAP = GEL_FOOLSCAP;
var GEL_CANON = "\n  font-size: 1.75rem;\n  line-height: 2rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 2rem;\n    line-height: 2.25rem;\n  }\n\n  ").concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 2.75rem;\n    line-height: 3rem;\n  }\n");
exports.GEL_CANON = GEL_CANON;
var GEL_TRAFALGAR = "\n  font-size: 1.25rem;\n  line-height: 1.5rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 1.5rem;\n    line-height: 1.75rem;\n  }\n\n  ").concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 2rem;\n    line-height: 2.25rem;\n  }\n");
exports.GEL_TRAFALGAR = GEL_TRAFALGAR;
var GEL_PARAGON = "\n  font-size: 1.25rem;\n  line-height: 1.5rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 1.375rem;\n    line-height: 1.625rem;\n  }\n\n  ").concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 1.75rem;\n    line-height: 2rem;\n  }\n");
exports.GEL_PARAGON = GEL_PARAGON;
var GEL_DOUBLE_PICA = "\n  font-size: 1.25rem;\n  line-height: 1.5rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 1.5rem;\n    line-height: 1.75rem;\n  }\n");
exports.GEL_DOUBLE_PICA = GEL_DOUBLE_PICA;
var GEL_GREAT_PRIMER = "\n  font-size: 1.125rem;\n  line-height: 1.375rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 1.25rem;\n    line-height: 1.5rem;\n  }\n");
exports.GEL_GREAT_PRIMER = GEL_GREAT_PRIMER;
var GEL_BODY_COPY = "\n  font-size: 0.9375rem;\n  line-height: 1.25rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_AND_LARGER, " {\n    font-size: 1rem;\n    line-height: 1.375rem;\n  }\n");
exports.GEL_BODY_COPY = GEL_BODY_COPY;
var GEL_PICA = "\n  font-size: 0.9375rem;\n  line-height: 1.25rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_AND_LARGER, " {\n    font-size: 1rem;\n    line-height: 1.25rem;\n  }\n");
exports.GEL_PICA = GEL_PICA;
var GEL_LONG_PRIMER = "\n  font-size: 0.9375rem;\n  line-height: 1.125rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 0.875rem;\n  }\n");
exports.GEL_LONG_PRIMER = GEL_LONG_PRIMER;
var GEL_BREVIER = "\n  font-size: 0.875rem;\n  line-height: 1rem;\n\n  ".concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    line-height: 1.125rem;\n  }\n\n  ").concat(_breakpoints.MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 0.8125rem;\n  }\n");
exports.GEL_BREVIER = GEL_BREVIER;
var GEL_MINION = "\n  font-size: 0.75rem;\n  line-height: 1rem;\n";
exports.GEL_MINION = GEL_MINION;