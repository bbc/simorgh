import { formatDuration } from '#psammead/psammead-timestamp-container/src/utilities';
import {
  KINGFISHER,
  EBON,
  SHADOW,
  WHITE,
  METAL,
  LIVE_DARK,
} from '../../../../components/ThemeProvider/palette';

export const programStateConfig = {
  live: {
    backgroundColor: LIVE_DARK,
    headerTextColor: EBON,
    titleColor: SHADOW,
    durationColor: WHITE,
  },
  next: {
    backgroundColor: WHITE,
    headerTextColor: METAL,
    titleColor: METAL,
    durationColor: KINGFISHER,
  },
  onDemand: {
    backgroundColor: EBON,
    headerTextColor: EBON,
    titleColor: SHADOW,
    durationColor: WHITE,
  },
};

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
