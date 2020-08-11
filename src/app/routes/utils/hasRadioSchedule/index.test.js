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
  };

  return Promise.resolve(mockConfigs[service]);
});

it('should return true when radio schedule is enabled in the service and for the page type', async () => {
  const actual = await hasRadioService({
    service: 'afrique',
    pageType: 'onDemandRadio',
  });
  const expected = true;

  expect(actual).toEqual(expected);
});

it('should return false when radio schedule is enabled in the service but not for the page type', async () => {
  const actual = await hasRadioService({
    service: 'afrique',
    pageType: 'frontPage',
  });
  const expected = false;

  expect(actual).toEqual(expected);
});

it('should return false when radio schedule is not enabled in the service', async () => {
  const actual = await hasRadioService({
    service: 'pidgin',
    pageType: 'frontPage',
  });
  const expected = false;

  expect(actual).toEqual(expected);
});
