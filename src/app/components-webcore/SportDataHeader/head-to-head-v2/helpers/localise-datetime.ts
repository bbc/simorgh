import 'temporal-polyfill/global';

import { Services } from '#app/models/types/global';

const JALALI_SERVICES: Services[] = ['persian', 'pashto'];

const LOCALE_MAP: Partial<Record<Services, string>> = {
  persian: 'fa-IR',
  // pashto: 'ps-AF' - Removed temporarily as this is not supported by Temporal and the sports header (for football) won't be shown in Pashto. To be looked at again if/when the sports header is shown in Pashto.
};

const MONTHS = [
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

const createUKDateTime = (inputDate: string, inputTime: string) => {
  const [, day, monthName, year] = inputDate.split(' ');
  const [hour, minute] = inputTime.split(':').map(Number);
  const monthIndex = MONTHS.indexOf(monthName) + 1;

  return Temporal.ZonedDateTime.from({
    timeZone: 'Europe/London',
    year: Number(year),
    month: monthIndex,
    day: Number(day),
    hour,
    minute,
  });
};

export const getLocalisedDate = (
  inputDate: string,
  inputTime: string,
  service?: Services,
) => {
  const ukDateTime = createUKDateTime(inputDate, inputTime);
  const useJalaliCalendar = service && JALALI_SERVICES.includes(service);
  const locale = (service && LOCALE_MAP[service]) ?? undefined;

  return ukDateTime
    .withTimeZone(Temporal.Now.timeZoneId())
    .toLocaleString(locale, {
      calendar: useJalaliCalendar ? 'persian' : undefined,
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
};

export const getLocalisedTime = (inputDate: string, inputTime: string) => {
  const ukDateTime = createUKDateTime(inputDate, inputTime);

  return ukDateTime
    .withTimeZone(Temporal.Now.timeZoneId())
    .toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      numberingSystem: 'latn',
    });
};
