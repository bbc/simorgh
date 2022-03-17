import { formatDuration } from '#legacy/psammead-timestamp-container/utilities';
import {
  C_KINGFISHER,
  C_POSTBOX,
  C_EBON,
  C_SHADOW,
  C_WHITE,
  C_METAL,
} from '#legacy/psammead-styles/colours';
export var programStateConfig = {
  live: {
    backgroundColor: C_POSTBOX,
    headerTextColor: C_EBON,
    titleColor: C_SHADOW,
    durationColor: C_WHITE,
  },
  next: {
    backgroundColor: C_WHITE,
    headerTextColor: C_METAL,
    titleColor: C_METAL,
    durationColor: C_KINGFISHER,
  },
  onDemand: {
    backgroundColor: C_EBON,
    headerTextColor: C_EBON,
    titleColor: C_SHADOW,
    durationColor: C_WHITE,
  },
};

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
    '%duration%': formatDuration({
      duration: duration,
      format: getDurationFormat(duration, separator),
      locale: locale,
    }),
  };
};

export default durationDictionary;
