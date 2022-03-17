"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MEDIA_QUERY_TYPOGRAPHY = exports.GEL_GROUP_CD_MIN_WIDTH = exports.GEL_GROUP_B_MAX_WIDTH = exports.GEL_GROUP_B_MIN_WIDTH = exports.GEL_GROUP_A_MAX_WIDTH = exports.GEL_GROUP_5_SCREEN_WIDTH_MIN = exports.GEL_GROUP_4_SCREEN_WIDTH_MAX = exports.GEL_GROUP_4_SCREEN_WIDTH_MIN = exports.GEL_GROUP_3_SCREEN_WIDTH_MAX = exports.GEL_GROUP_3_SCREEN_WIDTH_MIN = exports.GEL_GROUP_2_SCREEN_WIDTH_MAX = exports.GEL_GROUP_2_SCREEN_WIDTH_MIN = exports.GEL_GROUP_1_SCREEN_WIDTH_MAX = exports.GEL_GROUP_1_SCREEN_WIDTH_MIN = exports.GEL_GROUP_0_SCREEN_WIDTH_MAX = exports.GEL_GROUP_0_SCREEN_WIDTH_MIN = void 0;

/*
    The following are breakpoints from GEL Grid
    Link to relevant GEL docs: https://www.bbc.co.uk/gel/guidelines/grid#grid-sizes
    The only exception is that we have split out group 1 into 0 and 1
*/
var GEL_GROUP_0_SCREEN_WIDTH_MIN = "0rem"; // 0px

exports.GEL_GROUP_0_SCREEN_WIDTH_MIN = GEL_GROUP_0_SCREEN_WIDTH_MIN;
var GEL_GROUP_0_SCREEN_WIDTH_MAX = "14.9375rem"; // 239px

exports.GEL_GROUP_0_SCREEN_WIDTH_MAX = GEL_GROUP_0_SCREEN_WIDTH_MAX;
var GEL_GROUP_1_SCREEN_WIDTH_MIN = "15rem"; // 240px

exports.GEL_GROUP_1_SCREEN_WIDTH_MIN = GEL_GROUP_1_SCREEN_WIDTH_MIN;
var GEL_GROUP_1_SCREEN_WIDTH_MAX = "24.9375rem"; // 399px

exports.GEL_GROUP_1_SCREEN_WIDTH_MAX = GEL_GROUP_1_SCREEN_WIDTH_MAX;
var GEL_GROUP_2_SCREEN_WIDTH_MIN = "25rem"; // 400px

exports.GEL_GROUP_2_SCREEN_WIDTH_MIN = GEL_GROUP_2_SCREEN_WIDTH_MIN;
var GEL_GROUP_2_SCREEN_WIDTH_MAX = "37.4375rem"; // 599px

exports.GEL_GROUP_2_SCREEN_WIDTH_MAX = GEL_GROUP_2_SCREEN_WIDTH_MAX;
var GEL_GROUP_3_SCREEN_WIDTH_MIN = "37.5rem"; // 600px

exports.GEL_GROUP_3_SCREEN_WIDTH_MIN = GEL_GROUP_3_SCREEN_WIDTH_MIN;
var GEL_GROUP_3_SCREEN_WIDTH_MAX = "62.9375rem"; // 1007px

exports.GEL_GROUP_3_SCREEN_WIDTH_MAX = GEL_GROUP_3_SCREEN_WIDTH_MAX;
var GEL_GROUP_4_SCREEN_WIDTH_MIN = "63rem"; // 1008px

exports.GEL_GROUP_4_SCREEN_WIDTH_MIN = GEL_GROUP_4_SCREEN_WIDTH_MIN;
var GEL_GROUP_4_SCREEN_WIDTH_MAX = "79.9375rem"; // 1279px

exports.GEL_GROUP_4_SCREEN_WIDTH_MAX = GEL_GROUP_4_SCREEN_WIDTH_MAX;
var GEL_GROUP_5_SCREEN_WIDTH_MIN = "80rem"; // 1280px

/* 
   Screen sizes for GEL Typography
   These namings are based on the GEL description. They are also known as group A, group B and group D
   Link to relevant GEL docs: http://www.bbc.co.uk/gel/guidelines/typography#type-sizes
*/

exports.GEL_GROUP_5_SCREEN_WIDTH_MIN = GEL_GROUP_5_SCREEN_WIDTH_MIN;
var GEL_GROUP_A_MAX_WIDTH = 19.9375; // 319px

exports.GEL_GROUP_A_MAX_WIDTH = GEL_GROUP_A_MAX_WIDTH;
var GEL_GROUP_B_MIN_WIDTH = 20; // 320px

exports.GEL_GROUP_B_MIN_WIDTH = GEL_GROUP_B_MIN_WIDTH;
var GEL_GROUP_B_MAX_WIDTH = 37.4375; // 599px

exports.GEL_GROUP_B_MAX_WIDTH = GEL_GROUP_B_MAX_WIDTH;
var GEL_GROUP_CD_MIN_WIDTH = 37.5; // 600px

exports.GEL_GROUP_CD_MIN_WIDTH = GEL_GROUP_CD_MIN_WIDTH;
var MEDIA_QUERY_TYPOGRAPHY = {
  FEATURE_PHONE_ONLY: "@media (max-width: ".concat(GEL_GROUP_A_MAX_WIDTH, "rem)"),
  // < 319px
  SMART_PHONE_ONLY: "@media (min-width: ".concat(GEL_GROUP_B_MIN_WIDTH, "rem) and (max-width: ").concat(GEL_GROUP_B_MAX_WIDTH, "rem)"),
  // 320px - 599px
  SMART_PHONE_AND_LARGER: "@media (min-width: ".concat(GEL_GROUP_B_MIN_WIDTH, "rem)"),
  // > 320px
  LAPTOP_AND_LARGER: "@media (min-width: ".concat(GEL_GROUP_CD_MIN_WIDTH, "rem)") // > 600px

};
exports.MEDIA_QUERY_TYPOGRAPHY = MEDIA_QUERY_TYPOGRAPHY;