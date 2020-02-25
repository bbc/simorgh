import {
  hasBeenUpdated,
  publishedAndUpdatedToday,
  // shouldDisplayLastUpdatedTimestamp,
} from './shouldDisplayLastUpdatedTimestamp';
import { timestampGenerator, sameDayTimestampsGenerator } from './testHelpers';

// const regexDate = /[0-9]{1,2} \w+ [0-9]{4}/;
// const regexDatetime = /[0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/;

// const regexUpdatedDatetime = /Updated [0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/;
// const regexUpdatedDate = /^Updated [0-9]{1,2} \w+ [0-9]{4}$/;

describe('shouldDisplayLastUpdatedTimestamp functions', () => {
  let originalDate;

  beforeEach(() => {
    originalDate = Date.now;
  });

  afterEach(() => {
    Date.now = originalDate;
  });

  it('hasBeenUpdated should return true when the time difference between firstPublished and lastPublished in minutes is greater than the minutes tolerance', () => {
    const firstPublishedTimestamp = originalDate();
    const lastUpdatedTimestamp = timestampGenerator({ minutes: 2 });

    const msDifference = firstPublishedTimestamp - lastUpdatedTimestamp;
    const minutesDifference = msDifference / 1000 / 60;
    const minutesTolerance = 1;

    expect(hasBeenUpdated(minutesDifference, minutesTolerance)).toEqual(true);
  });
  it('hasBeenUpdated should return false when the time difference between firstPublished and lastPublished in minutes is less than the minutes tolerance', () => {
    const firstPublishedTimestamp = originalDate();
    const lastUpdatedTimestamp = timestampGenerator({ minutes: 0.8 });

    const msDifference = firstPublishedTimestamp - lastUpdatedTimestamp;
    const minutesDifference = msDifference / 1000 / 60;
    const minutesTolerance = 1;

    expect(hasBeenUpdated(minutesDifference, minutesTolerance)).toEqual(false);
  });

  it(`publishedAndUpdatedToday should return true when firstPublished and lastPublished today`, () => {
    const [midnightToday, oneAmToday] = sameDayTimestampsGenerator({
      intervals: [{ hours: 1 }],
    });

    const wasPublishedAndUpdatedToday = publishedAndUpdatedToday(
      midnightToday,
      oneAmToday,
    );
    expect(wasPublishedAndUpdatedToday).toEqual(true);
  });

  it('publishedAndUpdatedToday should return false when firstPublished is not today', () => {
    const firstPublishedTimestamp = timestampGenerator({ days: 1, minutes: 3 });
    const lastPublishedTimestamp = timestampGenerator({ days: 1, minutes: 1 });

    const wasPublishedAndUpdatedToday = publishedAndUpdatedToday(
      firstPublishedTimestamp,
      lastPublishedTimestamp,
    );

    expect(wasPublishedAndUpdatedToday).toEqual(false);
  });

  // should render both timestamps when article was published and updated today
  // shouldDisplayLastUpdatedTimestamp is true when article was published and updated today
  // true

  // should render both timestamps when lastUpdated is within relative time period
  // shouldDisplayLastUpdatedTimestamp is true when article was lastUpdated within relative time period
  // true

  // should render one timestamp when firstPublished and lastPublished is the same day, and lastPublished is outside of the relative window
  // shouldDisplayLastUpdatedTimestamp is false when article was firstPublished and lastPublished on the same day, and lastPublished is outside of the relative window
  // false

  // should render both timestamps when firstUpdated and lastUpdated are on different days
  // shouldDisplayLastUpdatedTimestamp is true when firstUpdated and lastUpdated are on different days
  // true
});
