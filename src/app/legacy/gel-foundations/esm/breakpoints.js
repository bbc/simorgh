/*
    The following are breakpoints from GEL Grid
    Link to relevant GEL docs: https://www.bbc.co.uk/gel/guidelines/grid#grid-sizes
    The only exception is that we have split out group 1 into 0 and 1
*/
export var GEL_GROUP_0_SCREEN_WIDTH_MIN = "0rem"; // 0px

export var GEL_GROUP_0_SCREEN_WIDTH_MAX = "14.9375rem"; // 239px

export var GEL_GROUP_1_SCREEN_WIDTH_MIN = "15rem"; // 240px

export var GEL_GROUP_1_SCREEN_WIDTH_MAX = "24.9375rem"; // 399px

export var GEL_GROUP_2_SCREEN_WIDTH_MIN = "25rem"; // 400px

export var GEL_GROUP_2_SCREEN_WIDTH_MAX = "37.4375rem"; // 599px

export var GEL_GROUP_3_SCREEN_WIDTH_MIN = "37.5rem"; // 600px

export var GEL_GROUP_3_SCREEN_WIDTH_MAX = "62.9375rem"; // 1007px

export var GEL_GROUP_4_SCREEN_WIDTH_MIN = "63rem"; // 1008px

export var GEL_GROUP_4_SCREEN_WIDTH_MAX = "79.9375rem"; // 1279px

export var GEL_GROUP_5_SCREEN_WIDTH_MIN = "80rem"; // 1280px

/* 
   Screen sizes for GEL Typography
   These namings are based on the GEL description. They are also known as group A, group B and group D
   Link to relevant GEL docs: http://www.bbc.co.uk/gel/guidelines/typography#type-sizes
*/

export var GEL_GROUP_A_MAX_WIDTH = 19.9375; // 319px

export var GEL_GROUP_B_MIN_WIDTH = 20; // 320px

export var GEL_GROUP_B_MAX_WIDTH = 37.4375; // 599px

export var GEL_GROUP_CD_MIN_WIDTH = 37.5; // 600px

export var MEDIA_QUERY_TYPOGRAPHY = {
  FEATURE_PHONE_ONLY: "@media (max-width: ".concat(GEL_GROUP_A_MAX_WIDTH, "rem)"),
  // < 319px
  SMART_PHONE_ONLY: "@media (min-width: ".concat(GEL_GROUP_B_MIN_WIDTH, "rem) and (max-width: ").concat(GEL_GROUP_B_MAX_WIDTH, "rem)"),
  // 320px - 599px
  SMART_PHONE_AND_LARGER: "@media (min-width: ".concat(GEL_GROUP_B_MIN_WIDTH, "rem)"),
  // > 320px
  LAPTOP_AND_LARGER: "@media (min-width: ".concat(GEL_GROUP_CD_MIN_WIDTH, "rem)") // > 600px

};