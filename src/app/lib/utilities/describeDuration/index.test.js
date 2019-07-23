import moment from 'moment';
import describeDuration from '.';

const translationStub = {
  h: 'Saa {x}',
  hh: 'Saa {x}',
  m: 'Dakika {x}',
  mm: 'Dakika {x}',
  s: 'Sekunde {x}',
  ss: 'Sekunde {x}',
};

const getDuration = seconds => {
  return moment.duration(seconds, 'seconds');
};

const minuteSingular = getDuration(60);
const minutePlural = getDuration(120);
const secondSingular = getDuration(1);
const secondPlural = getDuration(20);
const minuteSecond = getDuration(61);
const hourMinuteSecond = getDuration(3700);

describe('describeDuration', () => {
  it('returns the correct duration description', () => {
    expect(describeDuration(minuteSingular)).toEqual('1 minute');
    expect(describeDuration(minutePlural)).toEqual('2 minutes');
    expect(describeDuration(secondSingular)).toEqual('1 second');
    expect(describeDuration(secondPlural)).toEqual('20 seconds');
    expect(describeDuration(minuteSecond)).toEqual('1 minute 1 second');
    expect(describeDuration(hourMinuteSecond)).toEqual(
      '1 hour 1 minute 40 seconds',
    );
  });
  it('returns the correct duration description given translation', () => {
    expect(describeDuration(minuteSingular, translationStub)).toEqual(
      'Dakika 1',
    );
    expect(describeDuration(minutePlural, translationStub)).toEqual('Dakika 2');
    expect(describeDuration(secondSingular, translationStub)).toEqual(
      'Sekunde 1',
    );
    expect(describeDuration(secondPlural, translationStub)).toEqual(
      'Sekunde 20',
    );
    expect(describeDuration(minuteSecond, translationStub)).toEqual(
      'Dakika 1 Sekunde 1',
    );
    expect(describeDuration(hourMinuteSecond, translationStub)).toEqual(
      'Saa 1 Dakika 1 Sekunde 40',
    );
  });
});
