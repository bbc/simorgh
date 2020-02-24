import { isLastRelative, isSameDay, isToday } from './helpers';

const hasBeenUpdated = (timeDifferenceMinutes, minutesTolerance) =>
  timeDifferenceMinutes > minutesTolerance;

const publishedAndUpdatedToday = (firstPublished, lastPublished) =>
  isToday(firstPublished) && isSameDay(firstPublished, lastPublished);

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

  const updatedWithinRelativeTimePeriod = isLastRelative(lastPublished);

  const publishedAndUpdatedOnDifferentDays = !isSameDay(
    firstPublished,
    lastPublished,
  );

  return (
    isUpdated &&
    (isPublishedAndUpdatedToday ||
      updatedWithinRelativeTimePeriod ||
      publishedAndUpdatedOnDifferentDays)
  );
};

export default shouldLastUpdatedTimestampBeShown;
