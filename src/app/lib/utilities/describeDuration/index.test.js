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

describe('describeDuration', () => {
  it('returns the correct duration description', () => {
    expect(describeDuration(minute)).toEqual('1 minute');
    expect(describeDuration(minutes)).toEqual('2 minutes');
    expect(describeDuration(second)).toEqual('1 second');
    expect(describeDuration(seconds)).toEqual('20 seconds');
    expect(describeDuration(hour)).toEqual('1 hour');
    expect(describeDuration(hours)).toEqual('2 hours');
    expect(describeDuration(day)).toEqual('25 hours');
  });

  it('returns the correct duration description given translation', () => {
    expect(describeDuration(minute, translationStub)).toEqual('Dakika 1');
    expect(describeDuration(minutes, translationStub)).toEqual('Dakika 2');
    expect(describeDuration(second, translationStub)).toEqual('Sekunde 1');
    expect(describeDuration(seconds, translationStub)).toEqual('Sekunde 20');
    expect(describeDuration(hour, translationStub)).toEqual('Saa 1');
    expect(describeDuration(hours, translationStub)).toEqual('Masaa 2');
    expect(describeDuration(day, translationStub)).toEqual('Masaa 25');
  });
});
