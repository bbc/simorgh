import pixelsToRem from '../../utilities/pixelsToRem';

/*
  The following are breakpoints from GEL Grid
  Link to relevant GEL docs: https://www.bbc.co.uk/gel/guidelines/grid#grid-sizes
  The only exception is that we have split out group 1 into 0 and 1
*/
const GROUP_0_MAX_WIDTH_BP = pixelsToRem(239);

const GROUP_1_MIN_WIDTH_BP = pixelsToRem(240);
const GROUP_1_MAX_WIDTH_BP = pixelsToRem(399);

export const GROUP_2_MIN_WIDTH_BP = pixelsToRem(400);
export const GROUP_2_MAX_WIDTH_BP = pixelsToRem(599);

export const GROUP_3_MIN_WIDTH_BP = pixelsToRem(600);
export const GROUP_3_MAX_WIDTH_BP = pixelsToRem(1007);

export const GROUP_4_MIN_WIDTH_BP = pixelsToRem(1008);
const GROUP_4_MAX_WIDTH_BP = pixelsToRem(1279);

const GROUP_5_MIN_WIDTH_BP = pixelsToRem(1280);

export const GROUP_0_MAX_WIDTH = `@media (max-width: ${GROUP_0_MAX_WIDTH_BP}rem)`;

export const GROUP_1_MAX_WIDTH = `@media (max-width: ${GROUP_1_MAX_WIDTH_BP}rem)`;
export const GROUP_1_MIN_WIDTH = `@media (min-width: ${GROUP_1_MIN_WIDTH_BP}rem)`;
export const GROUP_1_ONLY = `@media (min-width: ${GROUP_1_MIN_WIDTH_BP}rem) and (max-width: ${GROUP_1_MAX_WIDTH_BP}rem)`;

export const GROUP_2_MAX_WIDTH = `@media (max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`;
export const GROUP_2_MIN_WIDTH = `@media (min-width: ${GROUP_2_MIN_WIDTH_BP}rem)`;
export const GROUP_2_ONLY = `@media (min-width: ${GROUP_2_MIN_WIDTH_BP}rem) and (max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`;

export const GROUP_1_AND_GROUP_2 = `@media (min-width: ${GROUP_1_MIN_WIDTH_BP}rem) and (max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`;

export const GROUP_3_MAX_WIDTH = `@media (max-width: ${GROUP_3_MAX_WIDTH_BP}rem)`;
export const GROUP_3_MIN_WIDTH = `@media (min-width: ${GROUP_3_MIN_WIDTH_BP}rem)`;
export const GROUP_3_ONLY = `@media (min-width: ${GROUP_3_MIN_WIDTH_BP}rem) and (max-width: ${GROUP_3_MAX_WIDTH_BP}rem)`;

export const GROUP_4_MAX_WIDTH = `@media (max-width: ${GROUP_4_MAX_WIDTH_BP}rem)`;
export const GROUP_4_MIN_WIDTH = `@media (min-width: ${GROUP_4_MIN_WIDTH_BP}rem)`;
export const GROUP_4_ONLY = `@media (min-width: ${GROUP_4_MIN_WIDTH_BP}rem) and (max-width: ${GROUP_4_MAX_WIDTH_BP}rem)`;

export const GROUP_5_MIN_WIDTH = `@media (min-width: ${GROUP_5_MIN_WIDTH_BP}rem)`;

export const FORCED_COLOURS = `@media screen and (forced-colors: active)`;
