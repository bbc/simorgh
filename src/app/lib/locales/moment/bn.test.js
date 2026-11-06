import moment from 'moment';
import './bn';

moment.locale('bn');

const assert = { equal: (val1, val2) => expect(val1).toEqual(val2) };

test('format ordinal', () => {
  assert.equal(moment([2011, 0, 1]).format('DDDo'), '১', '১');
  assert.equal(moment([2011, 0, 2]).format('DDDo'), '২', '২');
  assert.equal(moment([2011, 0, 3]).format('DDDo'), '৩', '৩');
  assert.equal(moment([2011, 0, 4]).format('DDDo'), '৪', '৪');
  assert.equal(moment([2011, 0, 5]).format('DDDo'), '৫', '৫');
  assert.equal(moment([2011, 0, 6]).format('DDDo'), '৬', '৬');
  assert.equal(moment([2011, 0, 7]).format('DDDo'), '৭', '৭');
  assert.equal(moment([2011, 0, 8]).format('DDDo'), '৮', '৮');
  assert.equal(moment([2011, 0, 9]).format('DDDo'), '৯', '৯');
  assert.equal(moment([2011, 0, 10]).format('DDDo'), '১০', '১০');

  assert.equal(moment([2011, 0, 11]).format('DDDo'), '১১', '১১');
  assert.equal(moment([2011, 0, 12]).format('DDDo'), '১২', '১২');
  assert.equal(moment([2011, 0, 13]).format('DDDo'), '১৩', '১৩');
  assert.equal(moment([2011, 0, 14]).format('DDDo'), '১৪', '১৪');
  assert.equal(moment([2011, 0, 15]).format('DDDo'), '১৫', '১৫');
  assert.equal(moment([2011, 0, 16]).format('DDDo'), '১৬', '১৬');
  assert.equal(moment([2011, 0, 17]).format('DDDo'), '১৭', '১৭');
  assert.equal(moment([2011, 0, 18]).format('DDDo'), '১৮', '১৮');
  assert.equal(moment([2011, 0, 19]).format('DDDo'), '১৯', '১৯');
  assert.equal(moment([2011, 0, 20]).format('DDDo'), '২০', '২০');

  assert.equal(moment([2011, 0, 21]).format('DDDo'), '২১', '২১');
  assert.equal(moment([2011, 0, 22]).format('DDDo'), '২২', '২২');
  assert.equal(moment([2011, 0, 23]).format('DDDo'), '২৩', '২৩');
  assert.equal(moment([2011, 0, 24]).format('DDDo'), '২৪', '২৪');
  assert.equal(moment([2011, 0, 25]).format('DDDo'), '২৫', '২৫');
  assert.equal(moment([2011, 0, 26]).format('DDDo'), '২৬', '২৬');
  assert.equal(moment([2011, 0, 27]).format('DDDo'), '২৭', '২৭');
  assert.equal(moment([2011, 0, 28]).format('DDDo'), '২৮', '२৮');
  assert.equal(moment([2011, 0, 29]).format('DDDo'), '২৯', '২৯');
  assert.equal(moment([2011, 0, 30]).format('DDDo'), '৩০', '৩০');

  assert.equal(moment([2011, 0, 31]).format('DDDo'), '৩১', '৩১');
});

test('from', () => {
  const start = moment([2007, 1, 28]);
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
    'কয়েক সেকেন্ড',
    '44 seconds = a few seconds'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
    'এক মিনিট',
    '45 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
    'এক মিনিট',
    '89 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
    '২ মিনিট',
    '90 seconds = 2 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
    '৪৪ মিনিট',
    '44 minutes = 44 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
    'এক ঘন্টা',
    '45 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
    'এক ঘন্টা',
    '89 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
    '২ ঘন্টা',
    '90 minutes = 2 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
    '৫ ঘন্টা',
    '5 hours = 5 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
    '২১ ঘন্টা',
    '21 hours = 21 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
    'এক দিন',
    '22 hours = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
    'এক দিন',
    '35 hours = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
    '২ দিন',
    '36 hours = 2 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
    'এক দিন',
    '1 day = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
    '৫ দিন',
    '5 days = 5 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
    '২৫ দিন',
    '25 days = 25 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
    'এক মাস',
    '26 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
    'এক মাস',
    '30 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
    '২ মাস',
    '46 days = 2 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
    '২ মাস',
    '75 days = 2 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
    '৩ মাস',
    '76 days = 3 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
    'এক মাস',
    '1 month = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
    '৫ মাস',
    '5 months = 5 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
    'এক বছর',
    '345 days = a year'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
    '২ বছর',
    '548 days = 2 years'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
    'এক বছর',
    '1 year = a year'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
    '৫ বছর',
    '5 years = 5 years'
  );
});

test('suffix', () => {
  assert.equal(moment(30000).from(0), 'কয়েক সেকেন্ড পরে', 'prefix');
  assert.equal(moment(0).from(30000), 'কয়েক সেকেন্ড আগে', 'suffix');
});

test('now from now', () => {
  assert.equal(
    moment().fromNow(),
    'কয়েক সেকেন্ড আগে',
    'now from now should display as in the past'
  );
});

test('fromNow', () => {
  assert.equal(
    moment().add({ s: 30 }).fromNow(),
    'কয়েক সেকেন্ড পরে',
    'কয়েক সেকেন্ড পরে'
  );
  assert.equal(moment().add({ d: 5 }).fromNow(), '৫ দিন পরে', '৫ দিন পরে');
});

test('calendar day', () => {
  const a = moment().hours(12).minutes(0).seconds(0);

  assert.equal(
    moment(a).calendar(),
    'আজ দুপুর ১২:০০ সময়',
    'today at the same time'
  );
  assert.equal(
    moment(a).add({ m: 25 }).calendar(),
    'আজ দুপুর ১২:২৫ সময়',
    'Now plus 25 min'
  );
  assert.equal(
    moment(a).add({ h: 3 }).calendar(),
    'আজ দুপুর ৩:০০ সময়',
    'Now plus 3 hours'
  );
  assert.equal(
    moment(a).add({ d: 1 }).calendar(),
    'আগামীকাল দুপুর ১২:০০ সময়',
    'tomorrow at the same time'
  );
  assert.equal(
    moment(a).subtract({ h: 1 }).calendar(),
    'আজ দুপুর ১১:০০ সময়',
    'Now minus 1 hour'
  );
  assert.equal(
    moment(a).subtract({ d: 1 }).calendar(),
    'গতকাল দুপুর ১২:০০ সময়',
    'yesterday at the same time'
  );
});

test('calendar next week', () => {
  let i;
  let m;
  for (i = 2; i < 7; i += 1) {
    m = moment().add({ d: i });
    assert.equal(
      m.calendar(),
      m.format('dddd[,] LT'),
      `Today + ${i} days current time`
    );
    m.hours(0).minutes(0).seconds(0).milliseconds(0);
    assert.equal(
      m.calendar(),
      m.format('dddd[,] LT'),
      `Today + ${i} days beginning of day`
    );
    m.hours(23).minutes(59).seconds(59).milliseconds(999);
    assert.equal(
      m.calendar(),
      m.format('dddd[,] LT'),
      `Today + ${i} days end of day`
    );
  }
});

test('calendar last week', () => {
  let i;
  let m;

  for (i = 2; i < 7; i += 1) {
    m = moment().subtract({ d: i });
    assert.equal(
      m.calendar(),
      m.format('[গত] dddd[,] LT'),
      `Today - ${i} days current time`
    );
    m.hours(0).minutes(0).seconds(0).milliseconds(0);
    assert.equal(
      m.calendar(),
      m.format('[গত] dddd[,] LT'),
      `Today - ${i} days beginning of day`
    );
    m.hours(23).minutes(59).seconds(59).milliseconds(999);
    assert.equal(
      m.calendar(),
      m.format('[গত] dddd[,] LT'),
      `Today - ${i} days end of day`
    );
  }
});

test('calendar all else', () => {
  let weeksAgo = moment().subtract({ w: 1 });
  let weeksFromNow = moment().add({ w: 1 });

  assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
  assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

  weeksAgo = moment().subtract({ w: 2 });
  weeksFromNow = moment().add({ w: 2 });

  assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
  assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
});

test('meridiem', () => {
  assert.equal(moment([2011, 2, 23, 2, 30]).format('a'), 'রাত', 'before dawn');
  assert.equal(moment([2011, 2, 23, 9, 30]).format('a'), 'সকাল', 'morning');
  assert.equal(
    moment([2011, 2, 23, 14, 30]).format('a'),
    'দুপুর',
    'during day'
  );
  assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), 'বিকাল', 'evening');
  assert.equal(
    moment([2011, 2, 23, 19, 30]).format('a'),
    'বিকাল',
    'late evening'
  );
  assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'রাত', 'night');

  assert.equal(moment([2011, 2, 23, 2, 30]).format('A'), 'রাত', 'before dawn');
  assert.equal(moment([2011, 2, 23, 9, 30]).format('A'), 'সকাল', 'morning');
  assert.equal(
    moment([2011, 2, 23, 14, 30]).format('A'),
    'দুপুর',
    ' during day'
  );
  assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), 'বিকাল', 'evening');
  assert.equal(
    moment([2011, 2, 23, 19, 30]).format('A'),
    'বিকাল',
    'late evening'
  );
  assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'রাত', 'night');
});

test('weeks year starting sunday formatted', () => {
  assert.equal(
    moment([2012, 0, 1]).format('w ww wo'),
    '১ ০১ ১',
    'Jan  1 2012 should be week 1'
  );
  assert.equal(
    moment([2012, 0, 7]).format('w ww wo'),
    '১ ০১ ১',
    'Jan  7 2012 should be week 1'
  );
  assert.equal(
    moment([2012, 0, 8]).format('w ww wo'),
    '২ ০২ ২',
    'Jan  8 2012 should be week 2'
  );
  assert.equal(
    moment([2012, 0, 14]).format('w ww wo'),
    '২ ০২ ২',
    'Jan 14 2012 should be week 2'
  );
  assert.equal(
    moment([2012, 0, 15]).format('w ww wo'),
    '৩ ০৩ ৩',
    'Jan 15 2012 should be week 3'
  );
});
