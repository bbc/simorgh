import moment from 'moment';
import './om';

moment.locale('om');

// This asset overrides the gunit assertion done in the moment codebase.
// Format and styling of this file has been keep consistent with the official moment tests.
// An example of these tests can be seen at https://github.com/moment/moment/blob/develop/src/test/locale/en-gb.js
const assert = { equal: (val1, val2) => expect(val1).toEqual(val2) };

test('format', () => {
  const a = [
    ['LL', '14 Guraandhala 2010'],
    ['D MMMM YYYY', '14 Guraandhala 2010'],
  ];
  const b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));
  let i;
  for (i = 0; i < a.length; i += 1) {
    assert.equal(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
  }
});

test('from', () => {
  const start = moment([2007, 1, 28]);
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
    'Daqiiqaa 1',
    '45 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
    'Daqiiqaa 1',
    '89 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
    'Daqiiqaa 2',
    '90 seconds = 2 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
    'Daqiiqaa 44',
    '44 minutes = 44 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
    "Sa'aatii tokko",
    '45 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
    "Sa'aatii tokko",
    '89 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
    "Sa'aatii 2",
    '90 minutes = 2 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
    "Sa'aatii 5",
    '5 hours = 5 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
    "Sa'aatii 21",
    '21 hours = 21 hours'
  );
});

test('suffix', () => {
  assert.equal(moment(0).from(50000), 'Daqiiqaa 1 dura', 'suffix');
});
