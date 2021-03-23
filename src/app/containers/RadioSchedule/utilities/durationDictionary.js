import { formatDuration } from '@bbc/psammead-timestamp-container/utilities';

const getDurationFormat = (duration, separator) => {
  const timeSections = ['mm', 'ss'];
  if (duration.includes('H')) {
    timeSections.unshift('h');
  }
  return timeSections.join(separator);
};

const durationDictionary = ({ duration = '', separator = ',', locale }) => ({
  '%duration%': formatDuration({
    duration,
    format: getDurationFormat(duration, separator),
    locale,
  }),
});

export default durationDictionary;
