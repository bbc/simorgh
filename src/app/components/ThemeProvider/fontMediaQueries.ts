import pixelsToRem from '../../utilities/pixelsToRem';

/* 
   Screen sizes for GEL Typography
   These namings are based on the GEL description. They are also known as group A, group B and group D
   Link to relevant GEL docs: http://www.bbc.co.uk/gel/guidelines/typography#type-sizes
*/

const GROUP_A_MAX_WIDTH_BP = pixelsToRem(319);
const GROUP_B_MAX_WIDTH_BP = pixelsToRem(599);
const GROUP_B_MIN_WIDTH_BP = pixelsToRem(320);
const GROUP_D_MIN_WIDTH_BP = pixelsToRem(600);

export const GROUP_A_MAX_WIDTH = `@media (max-width: ${GROUP_A_MAX_WIDTH_BP}rem)`;
export const GROUP_B_MAX_WIDTH = `@media (max-width: ${GROUP_B_MAX_WIDTH_BP}rem)`;
export const GROUP_B_MIN_WIDTH = `@media (min-width: ${GROUP_B_MIN_WIDTH_BP}rem)`;
export const GROUP_B_ONLY = `@media (min-width: ${GROUP_B_MIN_WIDTH_BP}rem) and (max-width: ${GROUP_B_MAX_WIDTH_BP}rem)`;
export const GROUP_D_MIN_WIDTH = `@media (min-width: ${GROUP_D_MIN_WIDTH_BP}rem)`;
