const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const locale = require('dayjs/locale/am');

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

dayjs.locale({
  ...locale,
  name: 'am',
  months: 'ጥር_የካቲት_መጋቢት_ሚያዚያ_ግንቦት_ሰኔ_ሀምሌ_ነሐሴ_መስከረም_ጥቅምት_ህዳር_ታህሳስ'.split('_'),
  formats: {
    ...locale.formats,
    LL: 'D MMMM YYYY',
  },
  relativeTime: {
    ...locale.relativeTime,
    past: '%s በፊት',
    m: 'ከ 1 ደቂቃ',
    mm: 'ከ %d ደቂቃዎች',
    h: 'ከ 1 ሰአት',
    hh: 'ከ %d ሰአት',
  },
});
