import moment from 'moment';
import describeDuration from '.';

const translationStub = {
  h: 'Saa {x}',
  hh: 'Masaa {x}',
  m: 'Dakika {x}',
  mm: 'Dakika {x}',
  s: 'Sekunde {x}',
  ss: 'Sekunde {x}',
};

const getDuration = seconds => {
  return moment.duration(seconds, 'seconds');
};

const second = getDuration(1);
const seconds = getDuration(20);
const minute = getDuration(60);
const minutes = getDuration(120);
const hour = getDuration(3600);
const hours = getDuration(7200);
const day = moment.duration(25, 'hours');

const minuteSecond = getDuration(61);
const minuteSeconds = getDuration(62);
const minutesSecond = getDuration(121);
const minutesSeconds = getDuration(122);

const hourMinute = getDuration(3660);
const hourMinutes = getDuration(3720);
const hoursMinute = getDuration(7260);
const hoursMinutes = getDuration(7320);

const hourSecond = getDuration(3601);
const hourSeconds = getDuration(3602);
const hoursSeconds = getDuration(7201);

const hourMinuteSecond = getDuration(3661);
const hourMinutesSecond = getDuration(3721);
const hourMinutesSeconds = getDuration(3722);

const hoursMinuteSecond = getDuration(7261);
const hoursMinutesSecond = getDuration(7321);
const hoursMinutesSeconds = getDuration(7322);

describe('describeDuration', () => {
  it('returns the correct duration description', () => {
    expect(describeDuration(minute)).toEqual('1 minute');
    expect(describeDuration(minutes)).toEqual('2 minutes');
    expect(describeDuration(second)).toEqual('1 second');
    expect(describeDuration(seconds)).toEqual('20 seconds');
    expect(describeDuration(hour)).toEqual('1 hour');
    expect(describeDuration(hours)).toEqual('2 hours');
    expect(describeDuration(day)).toEqual('25 hours');

    expect(describeDuration(minuteSecond)).toEqual('1 minute 1 second');
    expect(describeDuration(minuteSeconds)).toEqual('1 minute 2 seconds');
    expect(describeDuration(minutesSecond)).toEqual('2 minutes 1 second');
    expect(describeDuration(minutesSeconds)).toEqual('2 minutes 2 seconds');

    expect(describeDuration(hourMinute)).toEqual('1 hour 1 minute');
    expect(describeDuration(hourMinutes)).toEqual('1 hour 2 minutes');
    expect(describeDuration(hoursMinute)).toEqual('2 hours 1 minute');
    expect(describeDuration(hoursMinutes)).toEqual('2 hours 2 minutes');

    expect(describeDuration(hourSecond)).toEqual('1 hour 1 second');
    expect(describeDuration(hourSeconds)).toEqual('1 hour 2 seconds');
    expect(describeDuration(hoursSeconds)).toEqual('2 hours 1 second');

    expect(describeDuration(hourMinuteSecond)).toEqual(
      '1 hour 1 minute 1 second',
    );
    expect(describeDuration(hourMinutesSecond)).toEqual(
      '1 hour 2 minutes 1 second',
    );
    expect(describeDuration(hourMinutesSeconds)).toEqual(
      '1 hour 2 minutes 2 seconds',
    );

    expect(describeDuration(hoursMinuteSecond)).toEqual(
      '2 hours 1 minute 1 second',
    );
    expect(describeDuration(hoursMinutesSecond)).toEqual(
      '2 hours 2 minutes 1 second',
    );
    expect(describeDuration(hoursMinutesSeconds)).toEqual(
      '2 hours 2 minutes 2 seconds',
    );
  });

  it('returns the correct duration description given translation', () => {
    expect(describeDuration(minute, translationStub)).toEqual('Dakika 1');
    expect(describeDuration(minutes, translationStub)).toEqual('Dakika 2');
    expect(describeDuration(second, translationStub)).toEqual('Sekunde 1');
    expect(describeDuration(seconds, translationStub)).toEqual('Sekunde 20');
    expect(describeDuration(hour, translationStub)).toEqual('Saa 1');
    expect(describeDuration(hours, translationStub)).toEqual('Masaa 2');
    expect(describeDuration(day, translationStub)).toEqual('Masaa 25');

    expect(describeDuration(minuteSecond, translationStub)).toEqual(
      'Dakika 1 Sekunde 1',
    );
    expect(describeDuration(minutesSecond, translationStub)).toEqual(
      'Dakika 2 Sekunde 1',
    );
    expect(describeDuration(minutesSeconds, translationStub)).toEqual(
      'Dakika 2 Sekunde 2',
    );

    expect(describeDuration(hourMinute, translationStub)).toEqual(
      'Saa 1 Dakika 1',
    );
    expect(describeDuration(hourMinutes, translationStub)).toEqual(
      'Saa 1 Dakika 2',
    );
    expect(describeDuration(hoursMinute, translationStub)).toEqual(
      'Masaa 2 Dakika 1',
    );
    expect(describeDuration(hoursMinutes, translationStub)).toEqual(
      'Masaa 2 Dakika 2',
    );

    expect(describeDuration(hourSecond, translationStub)).toEqual(
      'Saa 1 Sekunde 1',
    );
    expect(describeDuration(hourSeconds, translationStub)).toEqual(
      'Saa 1 Sekunde 2',
    );
    expect(describeDuration(hoursSeconds, translationStub)).toEqual(
      'Masaa 2 Sekunde 1',
    );

    expect(describeDuration(hourMinuteSecond, translationStub)).toEqual(
      'Saa 1 Dakika 1 Sekunde 1',
    );
    expect(describeDuration(hourMinutesSecond, translationStub)).toEqual(
      'Saa 1 Dakika 2 Sekunde 1',
    );
    expect(describeDuration(hourMinutesSeconds, translationStub)).toEqual(
      'Saa 1 Dakika 2 Sekunde 2',
    );

    expect(describeDuration(hoursMinuteSecond, translationStub)).toEqual(
      'Masaa 2 Dakika 1 Sekunde 1',
    );
    expect(describeDuration(hoursMinutesSecond, translationStub)).toEqual(
      'Masaa 2 Dakika 2 Sekunde 1',
    );
    expect(describeDuration(hoursMinutesSeconds, translationStub)).toEqual(
      'Masaa 2 Dakika 2 Sekunde 2',
    );
  });
});
