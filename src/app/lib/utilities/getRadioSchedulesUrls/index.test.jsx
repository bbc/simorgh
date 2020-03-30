import { getRadioScheduleEndpoint, getLocalRadioScheduleEndpoint } from '.';

const baseUrl = 'http://test.com';

describe('getRadioScheduleEndpoint', () => {
  it('should return endpoint when passed service', () => {
    expect(getRadioScheduleEndpoint({ baseUrl, service: 'hausa' })).toBe(
      'http://test.com/hausa/bbc_hausa_radio/schedule.json',
    );
  });
  it('should return endpoint when passed service & radioService', () => {
    expect(
      getRadioScheduleEndpoint({
        baseUrl,
        service: 'persian',
        radioService: 'dari',
      }),
    ).toBe('http://test.com/persian/bbc_dari_radio/schedule.json');
  });
  describe('query param override', () => {
    it('should always return endpoint without query string on live', () => {
      expect(
        getRadioScheduleEndpoint({
          baseUrl,
          service: 'hausa',
          queryString: '?renderer_env=live',
          env: 'live',
        }),
      ).toBe('http://test.com/hausa/bbc_hausa_radio/schedule.json');
    });
    it('should return endpoint with query string on test', () => {
      expect(
        getRadioScheduleEndpoint({
          baseUrl,
          service: 'hausa',
          queryString: '?renderer_env=live',
          env: 'test',
        }),
      ).toBe(
        'http://test.com/hausa/bbc_hausa_radio/schedule.json?renderer_env=live',
      );
    });
    it('should return endpoint with query string on local', () => {
      expect(
        getRadioScheduleEndpoint({
          baseUrl,
          service: 'hausa',
          queryString: '?renderer_env=live',
          env: 'local',
        }),
      ).toBe(
        'http://test.com/hausa/bbc_hausa_radio/schedule.json?renderer_env=live',
      );
    });
    it('should return with query string when passed service & radioService', () => {
      expect(
        getRadioScheduleEndpoint({
          baseUrl,
          service: 'persian',
          radioService: 'dari',
          queryString: '?renderer_env=live',
          env: 'test',
        }),
      ).toBe(
        'http://test.com/persian/bbc_dari_radio/schedule.json?renderer_env=live',
      );
    });
  });
});

describe('getLocalRadioScheduleEndpoint', () => {
  it('should return endpoint when passed service', () => {
    expect(getLocalRadioScheduleEndpoint({ baseUrl, service: 'hausa' })).toBe(
      './data/hausa/bbc_hausa_radio/schedule.json',
    );
  });
  it('should return endpoint when passed service & radioService', () => {
    expect(
      getLocalRadioScheduleEndpoint({
        baseUrl,
        service: 'persian',
        radioService: 'dari',
      }),
    ).toBe('./data/persian/bbc_dari_radio/schedule.json');
  });
});
