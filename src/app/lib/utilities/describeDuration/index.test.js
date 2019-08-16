import moment from 'moment';
import describeDuration from '.';
import formatDuration from '../formatDuration';
import services from '../../config/services';

const getDuration = seconds => {
  return moment.duration(seconds, 'seconds');
};

const durationsData = {
  second: getDuration(1),
  seconds: getDuration(20),
  minute: getDuration(60),
  minutes: getDuration(120),
  hour: getDuration(3600),
  hours: getDuration(7200),
  day: moment.duration(25, 'hours'),

  minuteSecond: getDuration(61),
  minuteSeconds: getDuration(62),
  minutesSecond: getDuration(121),
  minutesSeconds: getDuration(122),

  hourMinute: getDuration(3660),
  hourMinutes: getDuration(3720),
  hoursMinute: getDuration(7260),
  hoursMinutes: getDuration(7320),

  hourSecond: getDuration(3601),
  hourSeconds: getDuration(3602),
  hoursSeconds: getDuration(7201),

  hourMinuteSecond: getDuration(3661),
  hourMinutesSecond: getDuration(3721),
  hourMinutesSeconds: getDuration(3722),

  hoursMinuteSecond: getDuration(7261),
  hoursMinutesSecond: getDuration(7321),
  hoursMinutesSeconds: getDuration(7322),
};

const testTranslations = () => {
  Object.keys(services)
    .filter(serviceName => serviceName !== 'default')
    .forEach(serviceName => {
      describe(`Translations for ${serviceName}`, () => {
        const { datetimeLocale, translations } = services[serviceName];
        const { durations } = translations;

        Object.keys(durationsData).forEach(durationName => {
          it(`should have correct translation for ${durationName}`, () => {
            moment.locale(datetimeLocale);
            const duration = durationsData[durationName];
            const translation = durations
              ? describeDuration(duration, durations.s)
              : formatDuration(duration, ',');
            expect(translation).toMatchSnapshot();
          });
        });
      });
    });
};

/* */

testTranslations();
