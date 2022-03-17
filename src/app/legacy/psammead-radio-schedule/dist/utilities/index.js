"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.programStateConfig = void 0;

var _utilities = require("@bbc/psammead-timestamp-container/utilities");

var _colours = require("@bbc/psammead-styles/colours");

var programStateConfig = {
  live: {
    backgroundColor: _colours.C_POSTBOX,
    headerTextColor: _colours.C_EBON,
    titleColor: _colours.C_SHADOW,
    durationColor: _colours.C_WHITE
  },
  next: {
    backgroundColor: _colours.C_WHITE,
    headerTextColor: _colours.C_METAL,
    titleColor: _colours.C_METAL,
    durationColor: _colours.C_KINGFISHER
  },
  onDemand: {
    backgroundColor: _colours.C_EBON,
    headerTextColor: _colours.C_EBON,
    titleColor: _colours.C_SHADOW,
    durationColor: _colours.C_WHITE
  }
};
exports.programStateConfig = programStateConfig;

var getDurationFormat = function getDurationFormat(duration, separator) {
  var timeSections = ['mm', 'ss'];

  if (duration.includes('H')) {
    timeSections.unshift('h');
  }

  return timeSections.join(separator);
};

var durationDictionary = function durationDictionary(_ref) {
  var _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? '' : _ref$duration,
      _ref$separator = _ref.separator,
      separator = _ref$separator === void 0 ? ',' : _ref$separator,
      locale = _ref.locale;
  return {
    '%duration%': (0, _utilities.formatDuration)({
      duration: duration,
      format: getDurationFormat(duration, separator),
      locale: locale
    })
  };
};

var _default = durationDictionary;
exports.default = _default;