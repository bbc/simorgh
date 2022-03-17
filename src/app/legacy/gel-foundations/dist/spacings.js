"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GEL_GUTTER_ABOVE_600PX = exports.GEL_MARGIN_ABOVE_400PX = exports.GEL_GUTTER_BELOW_600PX = exports.GEL_MARGIN_BELOW_400PX = exports.GEL_SPACING_SEPT = exports.GEL_SPACING_SEXT = exports.GEL_SPACING_QUIN = exports.GEL_SPACING_QUAD = exports.GEL_SPACING_TRPL = exports.GEL_SPACING_DBL = exports.GEL_SPACING_HLF_TRPL = exports.GEL_SPACING = exports.GEL_SPACING_HLF = void 0;

/*
    GEL Spacing
    Assumes 16px is set as the default font-size.
    This is changeable in the user's browser settings, as the html font-size is 100%
*/
var GEL_SPACING_HLF = "0.25rem";
exports.GEL_SPACING_HLF = GEL_SPACING_HLF;
var GEL_SPACING = "0.5rem";
exports.GEL_SPACING = GEL_SPACING;
var GEL_SPACING_HLF_TRPL = '0.75rem';
exports.GEL_SPACING_HLF_TRPL = GEL_SPACING_HLF_TRPL;
var GEL_SPACING_DBL = "1rem"; // 16px

exports.GEL_SPACING_DBL = GEL_SPACING_DBL;
var GEL_SPACING_TRPL = "1.5rem";
exports.GEL_SPACING_TRPL = GEL_SPACING_TRPL;
var GEL_SPACING_QUAD = "2rem"; // 32px

exports.GEL_SPACING_QUAD = GEL_SPACING_QUAD;
var GEL_SPACING_QUIN = "2.5rem";
exports.GEL_SPACING_QUIN = GEL_SPACING_QUIN;
var GEL_SPACING_SEXT = "3rem"; // 48px

exports.GEL_SPACING_SEXT = GEL_SPACING_SEXT;
var GEL_SPACING_SEPT = "3.5rem";
/*
    GEL Grid
    Margins and Gutters are defined here
    https://www.bbc.co.uk/gel/guidelines/grid#grid-sizes
*/

exports.GEL_SPACING_SEPT = GEL_SPACING_SEPT;
var GEL_MARGIN_BELOW_400PX = "".concat(GEL_SPACING);
exports.GEL_MARGIN_BELOW_400PX = GEL_MARGIN_BELOW_400PX;
var GEL_GUTTER_BELOW_600PX = "".concat(GEL_SPACING);
exports.GEL_GUTTER_BELOW_600PX = GEL_GUTTER_BELOW_600PX;
var GEL_MARGIN_ABOVE_400PX = "".concat(GEL_SPACING_DBL);
exports.GEL_MARGIN_ABOVE_400PX = GEL_MARGIN_ABOVE_400PX;
var GEL_GUTTER_ABOVE_600PX = "".concat(GEL_SPACING_DBL);
exports.GEL_GUTTER_ABOVE_600PX = GEL_GUTTER_ABOVE_600PX;