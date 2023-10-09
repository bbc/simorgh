import pixelsToRem from '../../utilities/pixelsToRem';

/** 0.5rem (8px) */
export const FULL = pixelsToRem(8);
/** 0.25rem (4px) */
export const HALF = FULL / 2;
/** 1rem (16px) */
export const DOUBLE = FULL * 2;
/** 1.5rem (24px) */
export const TRIPLE = FULL * 3;
/** 2rem (32px) */
export const QUADRUPLE = FULL * 4;
/** 2.5rem (40px) */
export const QUINTUPLE = FULL * 5;
/** 3rem (48px) */
export const SEXTUPLE = FULL * 6;

export const MARGIN_BELOW_400PX = `${FULL}rem`;
export const GUTTER_BELOW_600PX = `${FULL}rem`;
export const MARGIN_ABOVE_400PX = `${DOUBLE}rem`;
export const GUTTER_ABOVE_600PX = `${DOUBLE}rem`;
