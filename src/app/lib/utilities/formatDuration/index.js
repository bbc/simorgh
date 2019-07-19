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

export const offscreenDuration = duration => {
  const secondsTranslation = 'seconds';
  const minutesTranslation = 'minutes';

  if (duration < 60) {
    return `${duration} ${secondsTranslation}`;
  }

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  const descriptiveDuration = `${minutes} ${minutesTranslation} ${seconds} ${secondsTranslation}`;

  return descriptiveDuration;
};

export default formatDuration;
