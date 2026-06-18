import fixtureData from '#data/afrique/live/c7gk1vjglxn1t.json';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import type { HeadToHeadV2Data } from './types';
import HeadToHeadV2 from '.';
import readme from './README.md';
import metadata from './metadata.json';

type StoryData = HeadToHeadV2Data & {
  onwardJourneyLink?: string;
  tipoTopicId?: string;
};

const baseData = fixtureData.data.sportDataEventContent
  .sportDataEvent as unknown as StoryData;

// Helper to create sport data with a specific date/time
const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const createDataWithDateTime = (date: Date, timeUK: string): StoryData => {
  const day = DAY_NAMES[date.getDay()];
  const dayNum = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();

  return {
    ...baseData,
    date: `${day} ${dayNum} ${month} ${year}`,
    time: { displayTimeUK: timeUK, accessibleTime: timeUK },
  };
};

// Edge case dates for timezone testing
const threeMonthsFromNow = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

// Late night UK (23:30) - will be next day in Asia/Middle East
const lateNightUKDate = new Date(threeMonthsFromNow);
lateNightUKDate.setUTCHours(22, 30, 0, 0); // 23:30 BST or 22:30 GMT

// Early morning UK (01:00) - will be previous day in Americas
const earlyMorningUKDate = new Date(threeMonthsFromNow);
earlyMorningUKDate.setDate(earlyMorningUKDate.getDate() + 1);
earlyMorningUKDate.setUTCHours(0, 0, 0, 0); // 01:00 BST or 00:00 GMT

// Midday UK (12:00) - baseline, same day most places
const middayUKDate = new Date(threeMonthsFromNow);
middayUKDate.setDate(middayUKDate.getDate() + 2);
middayUKDate.setUTCHours(11, 0, 0, 0); // 12:00 BST or 11:00 GMT

interface ComponentProps {
  initialSportData: StoryData;
}

const Component = ({ initialSportData }: ComponentProps) => (
  <HeadToHeadV2
    initialSportData={initialSportData}
    isConciseView={false}
    shouldShowActions={false}
  />
);

export default {
  title:
    'Components/Live Page Sport Data Header/Head To Head V2 - Date Time Conversions',
  component: HeadToHeadV2,
  parameters: {
    chromatic: { disable: true },
    metadata,
    docs: {
      readme,
      description: {
        component: `Stories for testing date/time localisation and calendar conversions.

**How to test:**
1. Open browser DevTools
2. Go to Settings → Sensors → Location (Chrome) or similar
3. Change timezone and observe how date/time updates

**Jalali Calendar:** Persian service uses the Jalali (Persian) calendar instead of Gregorian.`,
      },
    },
  },
  globals: {
    corePalette: 'lightAlternative',
    servicePalette: 'sportLight',
    fontPalette: 'sansSimple',
  },
};

// ============================================
// JALALI CALENDAR STORIES
// ============================================

export const PersianServiceJalaliCalendar = () => (
  <ServiceContextProvider service="persian">
    <Component initialSportData={baseData} />
  </ServiceContextProvider>
);
PersianServiceJalaliCalendar.parameters = {
  docs: {
    description: {
      story:
        'Demonstrates the Jalali (Persian) calendar formatting when using the Persian service. The date will be displayed in the Jalali calendar format with Persian numerals (e.g., ۱۴۰۵ instead of 2026).',
    },
  },
};

// ============================================
// TIMEZONE EDGE CASE STORIES
// ============================================

export const LateNightUK2330 = () => (
  <Component
    initialSportData={createDataWithDateTime(lateNightUKDate, '23:30')}
  />
);
LateNightUK2330.parameters = {
  docs: {
    description: {
      story: `**23:30 UK time** - Edge case for timezone testing.
      
| Timezone | Expected |
|----------|----------|
| Asia/Tokyo (+9) | Next day, 07:30 |
| Asia/Tehran (+3:30) | Next day, 03:00 |
| Europe/Paris (+1/+2) | Next day, 00:30 or 01:30 |
| America/New_York (-5/-4) | Same day, 18:30 or 19:30 |

Change your browser timezone in DevTools to verify.`,
    },
  },
};

export const LateNightUK2330Persian = () => (
  <ServiceContextProvider service="persian">
    <Component
      initialSportData={createDataWithDateTime(lateNightUKDate, '23:30')}
    />
  </ServiceContextProvider>
);
LateNightUK2330Persian.parameters = {
  docs: {
    description: {
      story: `**23:30 UK time with Persian/Jalali calendar**

The date should transition to the next Jalali day when viewed from Asia/Tehran timezone.
Compare with the Gregorian version to verify the calendar conversion is correct.`,
    },
  },
};

export const EarlyMorningUK0100 = () => (
  <Component
    initialSportData={createDataWithDateTime(earlyMorningUKDate, '01:00')}
  />
);
EarlyMorningUK0100.parameters = {
  docs: {
    description: {
      story: `**01:00 UK time** - Edge case for timezone testing.
      
| Timezone | Expected |
|----------|----------|
| America/New_York (-5/-4) | Previous day, 20:00 or 21:00 |
| America/Los_Angeles (-8/-7) | Previous day, 17:00 or 18:00 |
| Asia/Tokyo (+9) | Same day, 10:00 |
| Europe/London (+0/+1) | Same day, 01:00 |

Change your browser timezone in DevTools to verify.`,
    },
  },
};

export const EarlyMorningUK0100Persian = () => (
  <ServiceContextProvider service="persian">
    <Component
      initialSportData={createDataWithDateTime(earlyMorningUKDate, '01:00')}
    />
  </ServiceContextProvider>
);
EarlyMorningUK0100Persian.parameters = {
  docs: {
    description: {
      story: `**01:00 UK time with Persian/Jalali calendar**

From Americas timezone, the Jalali date should show the previous day.`,
    },
  },
};

export const MiddayUK1200 = () => (
  <Component initialSportData={createDataWithDateTime(middayUKDate, '12:00')} />
);
MiddayUK1200.parameters = {
  docs: {
    description: {
      story: `**12:00 UK time** - Baseline case, should be same day in most timezones.
      
| Timezone | Expected |
|----------|----------|
| Most timezones | Same day |
| Pacific islands (+12/+13) | Might be next day (00:00 or 01:00) |

Use this as a reference when testing other edge cases.`,
    },
  },
};

export const MiddayUK1200Persian = () => (
  <ServiceContextProvider service="persian">
    <Component
      initialSportData={createDataWithDateTime(middayUKDate, '12:00')}
    />
  </ServiceContextProvider>
);
MiddayUK1200Persian.parameters = {
  docs: {
    description: {
      story: `**12:00 UK time with Persian/Jalali calendar**

Baseline Jalali date. Compare with Gregorian version to verify calendar conversion.
The Jalali year should be ~621 years less than the Gregorian year (e.g., 2026 → ۱۴۰۵).`,
    },
  },
};
