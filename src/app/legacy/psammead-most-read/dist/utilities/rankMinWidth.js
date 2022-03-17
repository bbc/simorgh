"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doubleDigitSmall = exports.singleDigitSmall = exports.doubleDigitMedium = exports.singleDigitMedium = exports.doubleDigitDefault = exports.singleDigitDefault = exports.smallFontServices = exports.mediumFontServices = void 0;

var _spacings = require("@bbc/gel-foundations/spacings");

// Services with fonts that have glyphs thinner than the majority of other fonts.
// This was mainly based on the old overrides (ie. Any group0 value < 2rem).
var mediumFontServices = ['arabic', 'bengali', 'tamil', 'telegu', 'urdu'];
exports.mediumFontServices = mediumFontServices;
var smallFontServices = ['persian', 'pashto']; // If numberOfItems < 10, no extra spacing needs to be accounted for.

exports.smallFontServices = smallFontServices;

var singleDigitDefault = function singleDigitDefault(size) {
  return {
    group0: {
      default: _spacings.GEL_SPACING_TRPL,
      small: _spacings.GEL_SPACING_DBL
    }[size],
    group1: {
      default: _spacings.GEL_SPACING_TRPL,
      small: _spacings.GEL_SPACING_DBL
    }[size],
    group2: {
      default: _spacings.GEL_SPACING_TRPL,
      small: _spacings.GEL_SPACING_DBL
    }[size],
    group3: {
      default: _spacings.GEL_SPACING_QUAD,
      small: _spacings.GEL_SPACING_DBL
    }[size],
    group5: _spacings.GEL_SPACING_QUAD
  };
}; // If numberOfItems >= 10, extra spacing needs to be accounted for.


exports.singleDigitDefault = singleDigitDefault;

var doubleDigitDefault = function doubleDigitDefault(size) {
  return {
    group3: _spacings.GEL_SPACING_QUAD,
    group5: _spacings.GEL_SPACING_QUAD,
    // These values are used to align the rank when a double digit exists in the column
    group0WithOneColumn: {
      default: _spacings.GEL_SPACING_QUIN,
      small: '1.75rem'
    }[size],
    group1WithOneColumn: {
      default: _spacings.GEL_SPACING_QUIN,
      small: '1.75rem'
    }[size],
    group2WithOneColumn: {
      default: _spacings.GEL_SPACING_SEXT,
      small: _spacings.GEL_SPACING_QUAD
    }[size],
    group3WithOneColumn: {
      default: '4rem',
      small: _spacings.GEL_SPACING_QUIN
    }[size],
    group3WithTwoColumns: '4rem',
    group5WithFiveColumns: '4rem'
  };
};

exports.doubleDigitDefault = doubleDigitDefault;
var singleDigitMedium = {
  group0: _spacings.GEL_SPACING_DBL,
  group1: _spacings.GEL_SPACING_DBL,
  group2: _spacings.GEL_SPACING_DBL,
  group3: _spacings.GEL_SPACING_TRPL,
  group5: _spacings.GEL_SPACING_TRPL
};
exports.singleDigitMedium = singleDigitMedium;

var doubleDigitMedium = function doubleDigitMedium(size) {
  return {
    group3: _spacings.GEL_SPACING_TRPL,
    group5: _spacings.GEL_SPACING_TRPL,
    // These values are used to align the rank when a double digit exists in the column
    group0WithOneColumn: {
      default: _spacings.GEL_SPACING_QUAD,
      small: _spacings.GEL_SPACING_TRPL
    }[size],
    group1WithOneColumn: {
      default: _spacings.GEL_SPACING_QUAD,
      small: _spacings.GEL_SPACING_TRPL
    }[size],
    group2WithOneColumn: {
      default: _spacings.GEL_SPACING_QUAD,
      small: _spacings.GEL_SPACING_TRPL
    }[size],
    group3WithOneColumn: {
      default: _spacings.GEL_SPACING_SEXT,
      small: _spacings.GEL_SPACING_TRPL
    }[size],
    group3WithTwoColumns: _spacings.GEL_SPACING_SEXT,
    group5WithFiveColumns: _spacings.GEL_SPACING_SEXT
  };
};

exports.doubleDigitMedium = doubleDigitMedium;
var singleDigitSmall = {
  group0: _spacings.GEL_SPACING_DBL,
  group1: _spacings.GEL_SPACING_DBL,
  group2: _spacings.GEL_SPACING_DBL,
  group3: _spacings.GEL_SPACING_TRPL,
  group5: _spacings.GEL_SPACING_TRPL
};
exports.singleDigitSmall = singleDigitSmall;
var doubleDigitSmall = {
  group3: _spacings.GEL_SPACING_TRPL,
  group5: _spacings.GEL_SPACING_TRPL,
  // These values are used to align the rank when a double digit exists in the column
  group0WithOneColumn: _spacings.GEL_SPACING_DBL,
  group1WithOneColumn: _spacings.GEL_SPACING_TRPL,
  group2WithOneColumn: _spacings.GEL_SPACING_TRPL,
  group3WithOneColumn: _spacings.GEL_SPACING_QUAD,
  group3WithTwoColumns: _spacings.GEL_SPACING_QUAD,
  group5WithFiveColumns: _spacings.GEL_SPACING_QUAD
};
exports.doubleDigitSmall = doubleDigitSmall;