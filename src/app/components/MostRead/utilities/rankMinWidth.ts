import {
  DOUBLE,
  QUADRUPLE,
  QUINTUPLE,
  SEXTUPLE,
  TRIPLE,
} from '#components/ThemeProvider/spacings';
import { Size } from '../types';

// Services with fonts that have glyphs thinner than the majority of other fonts.
// This was mainly based on the old overrides (ie. Any group0 value < 2rem).
export const mediumFontServices = [
  'arabic',
  'bengali',
  'tamil',
  'telegu',
  'urdu',
];

export const smallFontServices = ['persian', 'pashto'];

// If numberOfItems < 10, no extra spacing needs to be accounted for.
export const singleDigitDefault = (size: Size) => ({
  group0: {
    default: `${TRIPLE}rem`,
    small: `${DOUBLE}rem`,
  }[size],
  group1: {
    default: `${TRIPLE}rem`,
    small: `${DOUBLE}rem`,
  }[size],
  group2: {
    default: `${TRIPLE}rem`,
    small: `${DOUBLE}rem`,
  }[size],
  group3: {
    default: `${QUADRUPLE}rem`,
    small: `${DOUBLE}rem`,
  }[size],
  group5: `${QUADRUPLE}rem`,
});

// If numberOfItems >= 10, extra spacing needs to be accounted for.
export const doubleDigitDefault = (size: Size) => ({
  group3: `${QUADRUPLE}rem`,
  group5: `${QUADRUPLE}rem`,
  // These values are used to align the rank when a double digit exists in the column
  group0WithOneColumn: {
    default: `${QUINTUPLE}rem`,
    small: '1.75rem',
  }[size],
  group1WithOneColumn: {
    default: `${QUINTUPLE}rem`,
    small: '1.75rem',
  }[size],
  group2WithOneColumn: {
    default: `${SEXTUPLE}rem`,
    small: `${QUADRUPLE}rem`,
  }[size],
  group3WithOneColumn: {
    default: '4rem',
    small: `${QUINTUPLE}rem`,
  }[size],
  group3WithTwoColumns: '4rem',
  group5WithFiveColumns: '4rem',
});

export const singleDigitMedium = {
  group0: `${DOUBLE}rem`,
  group1: `${DOUBLE}rem`,
  group2: `${DOUBLE}rem`,
  group3: `${TRIPLE}rem`,
  group5: `${TRIPLE}rem`,
};

export const doubleDigitMedium = (size: Size) => ({
  group3: `${TRIPLE}rem`,
  group5: `${TRIPLE}rem`,
  // These values are used to align the rank when a double digit exists in the column
  group0WithOneColumn: {
    default: `${QUADRUPLE}rem`,
    small: `${TRIPLE}rem`,
  }[size],
  group1WithOneColumn: {
    default: `${QUADRUPLE}rem`,
    small: `${TRIPLE}rem`,
  }[size],
  group2WithOneColumn: {
    default: `${QUADRUPLE}rem`,
    small: `${TRIPLE}rem`,
  }[size],
  group3WithOneColumn: {
    default: `${SEXTUPLE}rem`,
    small: `${QUADRUPLE}rem`,
  }[size],
  group3WithTwoColumns: `${SEXTUPLE}rem`,
  group5WithFiveColumns: `${SEXTUPLE}rem`,
});

export const singleDigitSmall = {
  group0: `${DOUBLE}rem`,
  group1: `${DOUBLE}rem`,
  group2: `${DOUBLE}rem`,
  group3: `${TRIPLE}rem`,
  group5: `${TRIPLE}rem`,
};

export const doubleDigitSmall = {
  group3: `${TRIPLE}rem`,
  group5: `${TRIPLE}rem`,
  // These values are used to align the rank when a double digit exists in the column
  group0WithOneColumn: `${DOUBLE}rem`,
  group1WithOneColumn: `${TRIPLE}rem`,
  group2WithOneColumn: `${TRIPLE}rem`,
  group3WithOneColumn: `${QUADRUPLE}rem`,
  group3WithTwoColumns: `${QUADRUPLE}rem`,
  group5WithFiveColumns: `${QUADRUPLE}rem`,
};
