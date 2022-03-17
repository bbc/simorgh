"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSerifLight = exports.getSerifBold = exports.getSerifMediumItalic = exports.getSerifMedium = exports.getSerifRegular = exports.getSansLight = exports.getSansBoldItalic = exports.getSansBold = exports.getSansRegularItalic = exports.getSansRegular = void 0;

var fonts = _interopRequireWildcard(require("./font-families"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getSansRegular = function getSansRegular(service) {
  if (!fonts[service]) {
    return null;
  }

  return fonts[service].sansRegular;
};

exports.getSansRegular = getSansRegular;

var getSansRegularItalic = function getSansRegularItalic(service) {
  if (!fonts[service]) {
    return null;
  }

  var _fonts$service = fonts[service],
      sansRegularItalic = _fonts$service.sansRegularItalic,
      sansRegular = _fonts$service.sansRegular;
  return sansRegularItalic || sansRegular;
};

exports.getSansRegularItalic = getSansRegularItalic;

var getSansBold = function getSansBold(service) {
  if (!fonts[service]) {
    return null;
  }

  var _fonts$service2 = fonts[service],
      sansBold = _fonts$service2.sansBold,
      sansRegular = _fonts$service2.sansRegular;
  return sansBold || sansRegular;
};

exports.getSansBold = getSansBold;

var getSansBoldItalic = function getSansBoldItalic(service) {
  if (!fonts[service]) {
    return null;
  }

  var sansBoldItalic = fonts[service].sansBoldItalic;
  return sansBoldItalic || getSansBold(service);
};

exports.getSansBoldItalic = getSansBoldItalic;

var getSansLight = function getSansLight(service) {
  if (!fonts[service]) {
    return null;
  }

  var sansLight = fonts[service].sansLight;
  return sansLight || getSansRegular(service);
};

exports.getSansLight = getSansLight;

var getSerifRegular = function getSerifRegular(service) {
  if (!fonts[service]) {
    return null;
  }

  var serifRegular = fonts[service].serifRegular;
  return serifRegular || getSansRegular(service);
};

exports.getSerifRegular = getSerifRegular;

var getSerifMedium = function getSerifMedium(service) {
  if (!fonts[service]) {
    return null;
  }

  var serifMedium = fonts[service].serifMedium;
  return serifMedium || getSansBold(service);
};

exports.getSerifMedium = getSerifMedium;

var getSerifMediumItalic = function getSerifMediumItalic(service) {
  if (!fonts[service]) {
    return null;
  }

  var serifMediumItalic = fonts[service].serifMediumItalic;
  return serifMediumItalic || getSansBoldItalic(service);
};

exports.getSerifMediumItalic = getSerifMediumItalic;

var getSerifBold = function getSerifBold(service) {
  if (!fonts[service]) {
    return null;
  }

  var serifBold = fonts[service].serifBold;
  return serifBold || getSansBold(service);
};

exports.getSerifBold = getSerifBold;

var getSerifLight = function getSerifLight(service) {
  if (!fonts[service]) {
    return null;
  }

  var serifLight = fonts[service].serifLight;
  return serifLight || getSerifRegular(service);
};

exports.getSerifLight = getSerifLight;