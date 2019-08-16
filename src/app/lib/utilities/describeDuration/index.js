import moment from 'moment';

const interpolate = (num, relativeTime, format, secondTranslation) => {
  const interpolatedTime = relativeTime.split(' ');
  const index = format.split(' ').indexOf('%d');
  if (secondTranslation) {
    return index === 0 ? `1 ${secondTranslation}` : `${secondTranslation} 1`;
  }
  interpolatedTime[index] = num;
  return interpolatedTime.join(' ');
};

const getDescription = (num, key, secondTranslation) => {
  if (num === 0) {
    return '';
  }

  const locale = moment.localeData();
  const isSingular = num === 1;
  if (!isSingular) {
    return locale.relativeTime(num, false, key.repeat(2));
  }

  const format = locale._relativeTime[key.repeat(2)]; // eslint-disable-line
  const relativeTime = locale.relativeTime(num, false, key);

  if (typeof format === 'function') {
    return key === 's' ? `1 ${secondTranslation}` : relativeTime;
  }

  return interpolate(num, relativeTime, format, secondTranslation);
};

// momentjs duration
const describeDuration = (duration, secondTranslation) => {
  const seconds = getDescription(duration.seconds(), 's', secondTranslation);
  const minutes = getDescription(duration.minutes(), 'm');
  const hours = getDescription(Math.floor(duration.asHours()), 'h');
  return `${hours} ${minutes} ${seconds}`.trim();
};

export default describeDuration;
