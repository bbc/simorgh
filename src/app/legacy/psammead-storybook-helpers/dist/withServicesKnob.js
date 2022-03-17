"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _path = _interopRequireDefault(require("ramda/src/path"));

var _reactHelmet = require("react-helmet");

var _addonKnobs = require("@storybook/addon-knobs");

var scripts = _interopRequireWildcard(require("@bbc/gel-foundations/scripts"));

var _textVariants = _interopRequireDefault(require("./text-variants"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_SERVICE = 'news';
var SERVICES_LIST = Object.keys(_textVariants.default);

var getVariant = function getVariant(selectedService) {
  return (0, _path.default)([selectedService, 'variant']);
};

var getService = function getService(selectedService) {
  return (0, _path.default)([selectedService, 'service']);
};

var includesService = function includesService(services) {
  return function (service) {
    return services.includes(service);
  };
};

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$defaultService = _ref.defaultService,
      defaultService = _ref$defaultService === void 0 ? DEFAULT_SERVICE : _ref$defaultService,
      _ref$services = _ref.services,
      services = _ref$services === void 0 ? SERVICES_LIST : _ref$services;

  return function (storyFn) {
    var selectedService = (0, _addonKnobs.select)('Select a service', services.filter(includesService(services)), defaultService);
    var variant = getVariant(selectedService)(_textVariants.default);
    var service = variant ? getService(selectedService)(_textVariants.default) : selectedService;
    var _TEXT_VARIANTS$select = _textVariants.default[selectedService],
        text = _TEXT_VARIANTS$select.text,
        articlePath = _TEXT_VARIANTS$select.articlePath,
        longText = _TEXT_VARIANTS$select.longText,
        script = _TEXT_VARIANTS$select.script,
        locale = _TEXT_VARIANTS$select.locale,
        _TEXT_VARIANTS$select2 = _TEXT_VARIANTS$select.dir,
        dir = _TEXT_VARIANTS$select2 === void 0 ? 'ltr' : _TEXT_VARIANTS$select2,
        _TEXT_VARIANTS$select3 = _TEXT_VARIANTS$select.timezone,
        timezone = _TEXT_VARIANTS$select3 === void 0 ? 'GMT' : _TEXT_VARIANTS$select3,
        brandBackgroundColour = _TEXT_VARIANTS$select.brandBackgroundColour,
        brandForegroundColour = _TEXT_VARIANTS$select.brandForegroundColour,
        brandBorderColour = _TEXT_VARIANTS$select.brandBorderColour,
        brandHighlightColour = _TEXT_VARIANTS$select.brandHighlightColour;
    var storyProps = {
      text: text,
      articlePath: articlePath,
      longText: longText,
      script: scripts[script],
      locale: locale,
      dir: dir,
      service: service,
      variant: variant || 'default',
      selectedService: selectedService,
      timezone: timezone,
      brandBackgroundColour: brandBackgroundColour,
      brandForegroundColour: brandForegroundColour,
      brandBorderColour: brandBorderColour,
      brandHighlightColour: brandHighlightColour
    };
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmet.Helmet, {
      htmlAttributes: {
        dir: dir
      }
    }), storyFn(storyProps));
  };
};

exports.default = _default;