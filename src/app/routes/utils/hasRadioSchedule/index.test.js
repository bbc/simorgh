import hasRadioService from '.';

jest.mock('#app/routes/utils/getConfig', () => service => {
  const mockConfigs = {
    afrique: {
      radioSchedule: {
        hasRadioSchedule: true,
        onLiveRadioPage: true,
        onOnDemandRadioPage: true,
        onFrontPage: false,
      },
    },
    pidgin: {
      radioSchedule: {
        hasRadioSchedule: false,
        onLiveRadioPage: false,
        onOnDemandRadioPage: false,
        onFrontPage: false,
      },
    },
    persian: {
      radioSchedule: {
        hasRadioSchedule: true,
        onLiveRadioPage: true,
        onOnDemandRadioPage: true,
        onFrontPage: true,
      },
    },
  };

  return Promise.resolve(mockConfigs[service]);
});

it('should return true when radio schedule is enabled in the service and for the page type', async () => {
  const actual = await hasRadioService({
    service: 'afrique',
    pathname: '/afrique/bbc_afrique_radio/w172x601yx5z2n1',
    page: 'onDemandRadioPage',
  });
  const expected = true;

  expect(actual).toEqual(expected);
});

it('should return false when radio schedule is enabled in the service but not for the page type', async () => {
  const actual = await hasRadioService({
    service: 'afrique',
    pathname: '/afrique/bbc_afrique_radio/w172x601yx5z2n1',
    page: 'onFrontPage',
  });
  const expected = false;

  expect(actual).toEqual(expected);
});

it('should return false when radio schedule is not enabled in the service', async () => {
  const actual = await hasRadioService({
    service: 'pidgin',
    pathname: '/pidgin',
    page: 'onFrontPage',
  });
  const expected = false;

  expect(actual).toEqual(expected);
});

it('should return false when radio schedule is enabled in the service but the pathname inclludes bbc_persian_radio', async () => {
  const actual = await hasRadioService({
    service: 'persian',
    pathname: '/persian/bbc_persian_radio/liveradio',
    page: 'onLiveRadioPage',
  });
  const expected = false;

  expect(actual).toEqual(expected);
});
