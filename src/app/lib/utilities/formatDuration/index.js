/* eslint-disable prefer-template */

const lpad = s => s.toString().padStart(2, '0');

// the duration argument should be a moment duration!
const formatDuration = (duration, separator = ':') => {
  const isOverAnHour = duration.asHours() >= 1;

  let out = '';

  if (isOverAnHour) {
    out += Math.floor(duration.asHours()) + seperator;
    out += lpad(duration.minutes()) + separator;
  } else {
    out += duration.minutes() + separator;
  }

  out += lpad(duration.seconds());

  return out;
};

export default formatDuration;
