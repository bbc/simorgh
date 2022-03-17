"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _addonKnobs = require("@storybook/addon-knobs");

var _reactHelmet = require("react-helmet");

var _propTypes = require("prop-types");

var scripts = _interopRequireWildcard(require("@bbc/gel-foundations/scripts"));

var _textVariants = _interopRequireDefault(require("./text-variants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputProvider = function inputProvider(_ref) {
  var slots = _ref.slots,
      componentFunction = _ref.componentFunction,
      services = _ref.services,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options;
  return function () {
    var serviceNames = Object.keys(_textVariants.default);

    if (services) {
      serviceNames = serviceNames.filter(function (service) {
        return services.includes(service);
      });
    }

    var serviceName = (0, _addonKnobs.select)('Select a service', serviceNames, options.defaultService || 'news');
    var service = _textVariants.default[serviceName];
    var isNews = serviceName === 'news';
    var slotTexts = (slots || []).map(function (_ref2) {
      var defaultText = _ref2.defaultText;
      // Expect defaultText to be in English. When it is provided and we're
      // displaying English language on the story, set the default text for
      // this knob to defaultText.
      // When we switch to a language other than English, set the
      // text for the slot to the snippet from LANGUAGE_VARIANTS for that
      // language.
      return defaultText && isNews ? defaultText : service.text;
    });
    var script = scripts[service.script];
    var dir = service.dir || 'ltr';
    var locale = service.locale;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactHelmet.Helmet, {
      htmlAttributes: {
        dir: dir
      }
    }), componentFunction({
      slotTexts: slotTexts,
      script: script,
      dir: dir,
      locale: locale,
      service: serviceName
    }));
  };
};

inputProvider.propTypes = {
  slots: (0, _propTypes.arrayOf)((0, _propTypes.shape)({
    name: _propTypes.string,
    defaultText: _propTypes.string
  })),
  componentFunction: _propTypes.element,
  services: (0, _propTypes.arrayOf)(_propTypes.string),
  options: (0, _propTypes.shape)({
    defaultService: _propTypes.string
  })
};
var _default = inputProvider;
exports.default = _default;