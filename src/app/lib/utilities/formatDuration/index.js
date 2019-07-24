/* eslint-disable prefer-template */

const lpad = s => s.toString().padStart(2, '0');

// the duration argument should be a moment duration!
const formatDuration = duration => {
  const isOverAnHour = duration.asHours() >= 1;

  let out = '';

  if (isOverAnHour) {
    out += Math.floor(duration.asHours()) + ':';
    out += lpad(duration.minutes()) + ':';
  } else {
    out += duration.minutes() + ':';
  }

  out += lpad(duration.seconds());

  return out;
};

export default formatDuration;
