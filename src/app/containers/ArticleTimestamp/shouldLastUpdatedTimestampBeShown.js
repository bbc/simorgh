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
  const isUpdated = hasBeenUpdated(timeDifferenceMinutes, minutesTolerance);
  const isPublishedAndUpdatedToday = publishedAndUpdatedToday(
    firstPublished,
    lastPublished,
  );
  const isPublishedAndUpdatedOnSameDayNotRelative = publishedAndUpdatedOnSameDayAndNotRelative(
    firstPublished,
    lastPublished,
  );

  return (
    isUpdated &&
    (isPublishedAndUpdatedToday || !isPublishedAndUpdatedOnSameDayNotRelative)
    // Avoid double-negatives and flipping a 'show' condition
  );
};

export default shouldLastUpdatedTimestampBeShown;
