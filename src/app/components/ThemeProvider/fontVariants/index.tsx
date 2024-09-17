import { FontVariants } from '#models/types/theming';

export const getSansRegular = (fontVariants: FontVariants) =>
  fontVariants.sans.regular;

export const getSansRegularItalic = (fontVariants: FontVariants) => {
  const { regularItalic, regular } = fontVariants.sans;

  return regularItalic || regular;
};

export const getSansBold = (fontVariants: FontVariants) => {
  const { bold, regular } = fontVariants.sans;

  return bold || regular;
};

export const getSansBoldItalic = (fontVariants: FontVariants) =>
  fontVariants.sans.boldItalic || getSansBold(fontVariants);

export const getSansLight = (fontVariants: FontVariants) =>
  fontVariants.sans.light || getSansRegular(fontVariants);

export const getSerifRegular = (fontVariants: FontVariants) =>
  fontVariants.serif?.medium || getSansRegular(fontVariants);

export const getSerifMedium = (fontVariants: FontVariants) =>
  fontVariants.serif?.medium || getSansBold(fontVariants);

export const getSerifMediumItalic = (fontVariants: FontVariants) =>
  fontVariants.serif?.mediumItalic || getSansBoldItalic(fontVariants);

export const getSerifBold = (fontVariants: FontVariants) =>
  fontVariants.serif?.bold || getSansBold(fontVariants);

export const getSerifLight = (fontVariants: FontVariants) =>
  fontVariants.serif?.light || getSerifRegular(fontVariants);
