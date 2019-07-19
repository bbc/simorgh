const lpad = s => s.toString().padStart(2, '0');

// the duration argument should be a moment duration!
const formatDuration = duration => {
  const isOverAnHour = duration.asHours() >= 1;

  let out = '';

  if (isOverAnHour) {
    out += `${Math.floor(duration.asHours())}:`;
    out += `${lpad(duration.minutes())}:`;
  } else {
    out += `${duration.minutes()}:`;
  }

  out += lpad(duration.seconds());

  return out;
};

const getTranslation = (number, type, translations) => {
  const secondsTranslation = translations.seconds;
  const secondTranslation = translations.second;
  const minutesTranslation = translations.minutes;
  const minuteTranslation = translations.minute;
  const hoursTranslation = translations.hours;
  const hourTranslation = translations.hour;

  if (type === 'hours') {
    return `${number} ${number > 1 ? hoursTranslation : hourTranslation}`;
  }

  if (type === 'minutes') {
    return `${number} ${number > 1 ? minutesTranslation : minuteTranslation}`;
  }

  return `${number} ${number > 1 ? secondsTranslation : secondTranslation}`;
};

const getFormattedString = (
  translations,
  seconds,
  minutes = '',
  hours = '',
) => {
  if (!minutes && !hours) {
    return `${getTranslation(seconds, 'seconds', translations)}`;
  }

  if (!hours) {
    return `${getTranslation(
      minutes,
      'minutes',
      translations,
    )} ${getTranslation(seconds, 'seconds', translations)}`;
  }

  return `${getTranslation(hours, 'hours', translations)} ${getTranslation(
    minutes,
    'minutes',
    translations,
  )} ${getTranslation(seconds, 'seconds', translations)} `;
};

export const offscreenDuration = (duration, translations) => {
  let hours = '';
  let minutes = '';
  let seconds = '';

  // less than a minute
  if (duration < 60) {
    return getFormattedString(translations, duration);
  }

  // more than an hour
  if (duration >= 3600) {
    hours = Math.floor(duration / 3600);
    minutes = Math.floor((duration % 3600) / 60);
    seconds = Math.floor(duration % 60);

    return getFormattedString(translations, seconds, minutes, hours);
  }

  // minutes and seconds
  minutes = Math.floor(duration / 60);
  seconds = duration % 60;

  return getFormattedString(translations, seconds, minutes);
};

export default formatDuration;
