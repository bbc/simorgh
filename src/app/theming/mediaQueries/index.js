import {
  GROUP_0_MIN_WIDTH_BP,
  GROUP_0_MAX_WIDTH_BP,
  GROUP_1_MIN_WIDTH_BP,
  GROUP_1_MAX_WIDTH_BP,
  GROUP_2_MIN_WIDTH_BP,
  GROUP_2_MAX_WIDTH_BP,
  GROUP_3_MIN_WIDTH_BP,
  GROUP_3_MAX_WIDTH_BP,
  GROUP_4_MIN_WIDTH_BP,
  GROUP_4_MAX_WIDTH_BP,
  GROUP_5_MIN_WIDTH_BP,
} from './breakpoints';

export const GROUP_0_MIN_WIDTH = `@media (min-width: ${GROUP_0_MIN_WIDTH_BP}rem)`;
export const GROUP_1_MIN_WIDTH = `@media (min-width: ${GROUP_1_MIN_WIDTH_BP}rem)`;
export const GROUP_2_MIN_WIDTH = `@media (min-width: ${GROUP_2_MIN_WIDTH_BP}rem)`;
export const GROUP_3_MIN_WIDTH = `@media (min-width: ${GROUP_3_MIN_WIDTH_BP}rem)`;
export const GROUP_4_MIN_WIDTH = `@media (min-width: ${GROUP_4_MIN_WIDTH_BP}rem)`;
export const GROUP_5_MIN_WIDTH = `@media (min-width: ${GROUP_5_MIN_WIDTH_BP}rem)`;

export const GROUP_0_MAX_WIDTH = `@media (max-width: ${GROUP_0_MAX_WIDTH_BP}rem)`;
export const GROUP_1_MAX_WIDTH = `@media (max-width: ${GROUP_1_MAX_WIDTH_BP}rem)`;
export const GROUP_2_MAX_WIDTH = `@media (max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`;
export const GROUP_3_MAX_WIDTH = `@media (max-width: ${GROUP_3_MAX_WIDTH_BP}rem)`;
export const GROUP_4_MAX_WIDTH = `@media (max-width: ${GROUP_4_MAX_WIDTH_BP}rem)`;

export const GROUP_0_ONLY = `@media (min-width: ${GROUP_0_MIN_WIDTH_BP}rem) and (max-width: ${GROUP_0_MAX_WIDTH_BP}rem)`;
export const GROUP_1_ONLY = `@media (min-width: ${GROUP_1_MIN_WIDTH_BP}rem) and (max-width: ${GROUP_1_MAX_WIDTH_BP}rem)`;
export const GROUP_2_ONLY = `@media (min-width: ${GROUP_2_MIN_WIDTH_BP}rem) and (max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`;
export const GROUP_3_ONLY = `@media (min-width: ${GROUP_3_MIN_WIDTH_BP}rem) and (max-width: ${GROUP_3_MAX_WIDTH_BP}rem)`;
export const GROUP_4_ONLY = `@media (min-width: ${GROUP_4_MIN_WIDTH_BP}rem) and (max-width: ${GROUP_4_MAX_WIDTH_BP}rem)`;
