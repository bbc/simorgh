import { formatDuration } from '#psammead/psammead-timestamp-container/src/utilities';
import {
  LIVE_DARK,
  NEWS_CORE,
  GREY_8,
  GREY_7,
  WHITE,
  METAL,
} from '../../../../components/ThemeProvider/palette';

export const programStateConfig = {
  live: {
    backgroundColor: NEWS_CORE,
    headerTextColor: GREY_8,
    titleColor: GREY_7,
    durationColor: WHITE,
  },
  next: {
    backgroundColor: WHITE,
    headerTextColor: METAL,
    titleColor: METAL,
    durationColor: LIVE_DARK,
  },
  onDemand: {
    backgroundColor: GREY_8,
    headerTextColor: GREY_8,
    titleColor: GREY_7,
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
