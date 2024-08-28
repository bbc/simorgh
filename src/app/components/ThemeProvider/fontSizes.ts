import { GelFontSize, TypographyScript } from '#models/types/theming';
import pixelsToRem from '../../utilities/pixelsToRem';
import { GROUP_B_ONLY, GROUP_D_MIN_WIDTH } from './fontMediaQueries';

const getGelFontSizeStyles =
  (size: GelFontSize) => (script: TypographyScript) => ({
    fontSize: `${pixelsToRem(script[size].groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(script[size].groupA.lineHeight)}rem`,

    [GROUP_B_ONLY]: {
      fontSize: `${pixelsToRem(script[size].groupB.fontSize)}rem`,
      lineHeight: `${pixelsToRem(script[size].groupB.lineHeight)}rem`,
    },

    [GROUP_D_MIN_WIDTH]: {
      fontSize: `${pixelsToRem(script[size].groupD.fontSize)}rem`,
      lineHeight: `${pixelsToRem(script[size].groupD.lineHeight)}rem`,
    },
  });

export const getAtlasSize = getGelFontSizeStyles('atlas');
export const getElephantSize = getGelFontSizeStyles('elephant');
export const getImperialSize = getGelFontSizeStyles('imperial');
export const getRoyalSize = getGelFontSizeStyles('royal');
export const getFoolscapSize = getGelFontSizeStyles('foolscap');
export const getCanonSize = getGelFontSizeStyles('canon');
export const getTrafalgarSize = getGelFontSizeStyles('trafalgar');
export const getParagonSize = getGelFontSizeStyles('paragon');
export const getDoublePicaSize = getGelFontSizeStyles('doublePica');
export const getGreatPrimerSize = getGelFontSizeStyles('greatPrimer');
export const getBodyCopySize = getGelFontSizeStyles('bodyCopy');
export const getPicaSize = getGelFontSizeStyles('pica');
export const getLongPrimerSize = getGelFontSizeStyles('longPrimer');
export const getBrevierSize = getGelFontSizeStyles('brevier');
export const getMinionSize = getGelFontSizeStyles('minion');
