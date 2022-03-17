import * as fonts from './font-families';

export const getSansRegular = service => {
  if (!fonts[service]) {
    return null;
  }
  return fonts[service].sansRegular;
};

export const getSansRegularItalic = service => {
  if (!fonts[service]) {
    return null;
  }
  const { sansRegularItalic, sansRegular } = fonts[service];
  return sansRegularItalic || sansRegular;
};

export const getSansBold = service => {
  if (!fonts[service]) {
    return null;
  }
  const { sansBold, sansRegular } = fonts[service];
  return sansBold || sansRegular;
};

export const getSansBoldItalic = service => {
  if (!fonts[service]) {
    return null;
  }
  const { sansBoldItalic } = fonts[service];
  return sansBoldItalic || getSansBold(service);
};

export const getSansLight = service => {
  if (!fonts[service]) {
    return null;
  }
  const { sansLight } = fonts[service];
  return sansLight || getSansRegular(service);
};

export const getSerifRegular = service => {
  if (!fonts[service]) {
    return null;
  }
  const { serifRegular } = fonts[service];
  return serifRegular || getSansRegular(service);
};

export const getSerifMedium = service => {
  if (!fonts[service]) {
    return null;
  }
  const { serifMedium } = fonts[service];
  return serifMedium || getSansBold(service);
};

export const getSerifMediumItalic = service => {
  if (!fonts[service]) {
    return null;
  }
  const { serifMediumItalic } = fonts[service];
  return serifMediumItalic || getSansBoldItalic(service);
};

export const getSerifBold = service => {
  if (!fonts[service]) {
    return null;
  }
  const { serifBold } = fonts[service];
  return serifBold || getSansBold(service);
};

export const getSerifLight = service => {
  if (!fonts[service]) {
    return null;
  }
  const { serifLight } = fonts[service];
  return serifLight || getSerifRegular(service);
};
