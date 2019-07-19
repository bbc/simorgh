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

const getFormattedString = durationInfo => {
  const array = [];

  durationInfo.forEach(innerArray => {
    array.push(`${innerArray[0]} ${innerArray[1][innerArray[2]]}`);
  });

  if (array.length === 1) {
    return array[0];
  }

  return array.length === 2
    ? `${array[0]} ${array[1]}`
    : `${array[0]} ${array[1]} ${array[2]}`;
};

const getSingularOrPlural = duration => {
  return duration > 1 ? 'plural' : 'singular';
};

export const offscreenDuration = (duration, translations) => {
  let hours = '';
  let minutes = '';
  let seconds = '';

  // less than a minute
  if (duration < 60) {
    const durationObj = [
      [duration, translations.seconds, getSingularOrPlural(duration)],
    ];

    return getFormattedString(durationObj);
  }

  // more than an hour
  if (duration >= 3600) {
    hours = Math.floor(duration / 3600);
    minutes = Math.floor((duration % 3600) / 60);
    seconds = Math.floor(duration % 60);

    const durationObj = [
      [hours, translations.hours, getSingularOrPlural(hours)],
      [minutes, translations.minutes, getSingularOrPlural(minutes)],
      [seconds, translations.seconds, getSingularOrPlural(seconds)],
    ];

    return getFormattedString(durationObj);
  }

  // minutes and seconds
  minutes = Math.floor(duration / 60);
  seconds = duration % 60;

  const durationObj = [
    [minutes, translations.minutes, getSingularOrPlural(minutes)],
    [seconds, translations.seconds, getSingularOrPlural(seconds)],
  ];

  return getFormattedString(durationObj);
};

export default formatDuration;
