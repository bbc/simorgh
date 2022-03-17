import * as fonts from './font-families';
export var getSansRegular = function getSansRegular(service) {
  if (!fonts[service]) {
    return null;
  }

  return fonts[service].sansRegular;
};
export var getSansRegularItalic = function getSansRegularItalic(service) {
  if (!fonts[service]) {
    return null;
  }

  var _fonts$service = fonts[service],
      sansRegularItalic = _fonts$service.sansRegularItalic,
      sansRegular = _fonts$service.sansRegular;
  return sansRegularItalic || sansRegular;
};
export var getSansBold = function getSansBold(service) {
  if (!fonts[service]) {
    return null;
  }

  var _fonts$service2 = fonts[service],
      sansBold = _fonts$service2.sansBold,
      sansRegular = _fonts$service2.sansRegular;
  return sansBold || sansRegular;
};
export var getSansBoldItalic = function getSansBoldItalic(service) {
  if (!fonts[service]) {
    return null;
  }

  var sansBoldItalic = fonts[service].sansBoldItalic;
  return sansBoldItalic || getSansBold(service);
};
export var getSansLight = function getSansLight(service) {
  if (!fonts[service]) {
    return null;
  }

  var sansLight = fonts[service].sansLight;
  return sansLight || getSansRegular(service);
};
export var getSerifRegular = function getSerifRegular(service) {
  if (!fonts[service]) {
    return null;
  }

  var serifRegular = fonts[service].serifRegular;
  return serifRegular || getSansRegular(service);
};
export var getSerifMedium = function getSerifMedium(service) {
  if (!fonts[service]) {
    return null;
  }

  var serifMedium = fonts[service].serifMedium;
  return serifMedium || getSansBold(service);
};
export var getSerifMediumItalic = function getSerifMediumItalic(service) {
  if (!fonts[service]) {
    return null;
  }

  var serifMediumItalic = fonts[service].serifMediumItalic;
  return serifMediumItalic || getSansBoldItalic(service);
};
export var getSerifBold = function getSerifBold(service) {
  if (!fonts[service]) {
    return null;
  }

  var serifBold = fonts[service].serifBold;
  return serifBold || getSansBold(service);
};
export var getSerifLight = function getSerifLight(service) {
  if (!fonts[service]) {
    return null;
  }

  var serifLight = fonts[service].serifLight;
  return serifLight || getSerifRegular(service);
};