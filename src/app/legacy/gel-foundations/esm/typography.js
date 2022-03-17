import { MEDIA_QUERY_TYPOGRAPHY } from './breakpoints';
import getTypeSizes from './getTypeSizes';
var fontFamilyBase = ', Helvetica, Arial, sans-serif';
export var GEL_FF_REITH_SERIF = "ReithSerif".concat(fontFamilyBase);
export var GEL_FF_REITH_SANS = "ReithSans".concat(fontFamilyBase);
export var GEL_FF_REITH_SANS_COND = "ReithSansCondensed".concat(fontFamilyBase);
export var getAtlas = function getAtlas(script) {
  return getTypeSizes('atlas', script);
};
export var getElephant = function getElephant(script) {
  return getTypeSizes('elephant', script);
};
export var getImperial = function getImperial(script) {
  return getTypeSizes('imperial', script);
};
export var getRoyal = function getRoyal(script) {
  return getTypeSizes('royal', script);
};
export var getFoolscap = function getFoolscap(script) {
  return getTypeSizes('foolscap', script);
};
export var getCanon = function getCanon(script) {
  return getTypeSizes('canon', script);
};
export var getTrafalgar = function getTrafalgar(script) {
  return getTypeSizes('trafalgar', script);
};
export var getParagon = function getParagon(script) {
  return getTypeSizes('paragon', script);
};
export var getDoublePica = function getDoublePica(script) {
  return getTypeSizes('doublePica', script);
};
export var getGreatPrimer = function getGreatPrimer(script) {
  return getTypeSizes('greatPrimer', script);
};
export var getBodyCopy = function getBodyCopy(script) {
  return getTypeSizes('bodyCopy', script);
};
export var getPica = function getPica(script) {
  return getTypeSizes('pica', script);
};
export var getLongPrimer = function getLongPrimer(script) {
  return getTypeSizes('longPrimer', script);
};
export var getBrevier = function getBrevier(script) {
  return getTypeSizes('brevier', script);
};
export var getMinion = function getMinion(script) {
  return getTypeSizes('minion', script);
};
/* ORIGINAL CONSTANTS */

export var GEL_ATLAS = "\n  font-size: 4.875rem;\n  line-height: 5.25rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 6rem;\n    line-height: 6.5rem;\n  }\n\n  ").concat(MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 8.75rem;\n    line-height: 9.25rem;\n  }\n");
export var GEL_ELEPHANT = "\n  font-size: 3.75rem;\n  line-height: 4rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 4.875rem;\n    line-height: 5.25rem;\n  }\n\n  ").concat(MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 7.25rem;\n    line-height: 7.75rem;\n  }\n");
export var GEL_IMPERIAL = "\n  font-size: 3.125rem;\n  line-height: 3.375rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 4rem;\n    line-height: 4.5rem;\n  }\n\n  ").concat(MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 6rem;\n    line-height: 6.5rem;\n  }\n");
export var GEL_ROYAL = "\n  font-size: 2.5rem;\n  line-height: 2.75rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 3.25rem;\n    line-height: 3.75rem;\n  }\n\n  ").concat(MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 4.75rem;\n    line-height: 5.25rem;\n  }\n");
export var GEL_FOOLSCAP = "\n  font-size: 2rem;\n  line-height: 2.25rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 2.5rem;\n    line-height: 2.75rem;\n  }\n\n  ").concat(MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 3.5rem;\n    line-height: 3.75rem;\n  }\n");
export var GEL_CANON = "\n  font-size: 1.75rem;\n  line-height: 2rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 2rem;\n    line-height: 2.25rem;\n  }\n\n  ").concat(MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 2.75rem;\n    line-height: 3rem;\n  }\n");
export var GEL_TRAFALGAR = "\n  font-size: 1.25rem;\n  line-height: 1.5rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 1.5rem;\n    line-height: 1.75rem;\n  }\n\n  ").concat(MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 2rem;\n    line-height: 2.25rem;\n  }\n");
export var GEL_PARAGON = "\n  font-size: 1.25rem;\n  line-height: 1.5rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    font-size: 1.375rem;\n    line-height: 1.625rem;\n  }\n\n  ").concat(MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 1.75rem;\n    line-height: 2rem;\n  }\n");
export var GEL_DOUBLE_PICA = "\n  font-size: 1.25rem;\n  line-height: 1.5rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 1.5rem;\n    line-height: 1.75rem;\n  }\n");
export var GEL_GREAT_PRIMER = "\n  font-size: 1.125rem;\n  line-height: 1.375rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 1.25rem;\n    line-height: 1.5rem;\n  }\n");
export var GEL_BODY_COPY = "\n  font-size: 0.9375rem;\n  line-height: 1.25rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_AND_LARGER, " {\n    font-size: 1rem;\n    line-height: 1.375rem;\n  }\n");
export var GEL_PICA = "\n  font-size: 0.9375rem;\n  line-height: 1.25rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_AND_LARGER, " {\n    font-size: 1rem;\n    line-height: 1.25rem;\n  }\n");
export var GEL_LONG_PRIMER = "\n  font-size: 0.9375rem;\n  line-height: 1.125rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 0.875rem;\n  }\n");
export var GEL_BREVIER = "\n  font-size: 0.875rem;\n  line-height: 1rem;\n\n  ".concat(MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n    line-height: 1.125rem;\n  }\n\n  ").concat(MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n    font-size: 0.8125rem;\n  }\n");
export var GEL_MINION = "\n  font-size: 0.75rem;\n  line-height: 1rem;\n";