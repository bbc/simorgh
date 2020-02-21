import { isLastRelative, isSameDay, isToday } from './helpers';

const hasBeenUpdated = (timeDifferenceMinutes, minutesTolerance) =>
  timeDifferenceMinutes > minutesTolerance;

const publishedAndUpdatedToday = (firstPublished, lastPublished) =>
  isToday(firstPublished) && isSameDay(firstPublished, lastPublished);

const publishedAndUpdatedOnSameDayAndNotRelative = (
  firstPublished,
  lastPublished,
) => isSameDay(firstPublished, lastPublished) && !isLastRelative(lastPublished);
// Could this be reconsidered as publishedAndUpdatedOnDifferentDaysAndLastUpdatedNotRelative
// !isSameDay

const shouldLastUpdatedTimestampBeShown = ({
  minutesTolerance,
  firstPublished,
  lastPublished,
}) => {
  const timeDifferenceMinutes = (lastPublished - firstPublished) / 1000 / 60;
  return (
    hasBeenUpdated(timeDifferenceMinutes, minutesTolerance) &&
    (publishedAndUpdatedToday(firstPublished, lastPublished) ||
      !publishedAndUpdatedOnSameDayAndNotRelative(
        firstPublished,
        lastPublished,
      ))
    // Avoid double-negatives and flipping a 'show' condition
  );
};

export default shouldLastUpdatedTimestampBeShown;
