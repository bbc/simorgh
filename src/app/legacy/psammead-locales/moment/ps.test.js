import moment from 'moment';
import './ps';

moment.locale('ps');

// This asset overrides the gunit assertion done in the moment codebase.
// Format and styling of this file has been keep consistent with the official moment tests.
// An example of these tests can be seen at https://github.com/moment/moment/blob/develop/src/test/locale/en-gb.js
const assert = { equal: (val1, val2) => expect(val1).toEqual(val2) };

test('format', function () {
  var a = [
      ['MMMM Do YYYY, h:mm:ss', 'فبروري ۱۴ ۲۰۱۰، ۳:۲۵:۵۰'],
      ['M Mo MM MMMM MMM', '۲ ۲ ۰۲ فبروري فبروري'],
      ['L', '۰۲/۱۴/۲۰۱۰'],
      ['LL', '۱۴ فبروري ۲۰۱۰'],
      ['LLL', '۱۴ فبروري ۲۰۱۰ ۱۵:۲۵'],
      ['D MMMM YYYY', '۱۴ فبروري ۲۰۱۰'],
    ],
    b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
    i;
  for (i = 0; i < a.length; i++) {
    assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
  }
});

test('from', function () {
  var start = moment([2007, 1, 28]);
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
    '۱ دقیقه',
    '45 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
    '۱ دقیقه',
    '89 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
    '۲ دقیقې',
    '90 seconds = 2 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
    '۴۴ دقیقې',
    '44 minutes = 44 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
    '۱ ساعت',
    '45 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
    '۱ ساعت',
    '89 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
    '۲ ساعتونه',
    '90 minutes = 2 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
    '۵ ساعتونه',
    '5 hours = 5 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
    '۲۱ ساعتونه',
    '21 hours = 21 hours'
  );
});
