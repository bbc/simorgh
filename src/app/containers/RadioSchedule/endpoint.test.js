import {
  getRadioScheduleEndpoint,
  getLocalRadioScheduleEndpoint,
  getLink,
} from './endpoint';

describe('getRadioScheduleEndpoint', () => {
  it('should return endpoint when passed service', () => {
    expect(getRadioScheduleEndpoint({ service: 'hausa' })).toBe(
      '/hausa/bbc_hausa_radio/schedule.json',
    );
  });
  it('should return endpoint when passed service & radioService', () => {
    expect(
      getRadioScheduleEndpoint({ service: 'persian', radioService: 'dari' }),
    ).toBe('/persian/bbc_dari_radio/schedule.json');
  });
  describe('query param override', () => {
    it('should always return endpoint without query string on live', () => {
      expect(
        getRadioScheduleEndpoint({
          service: 'hausa',
          queryString: 'renderer_env=live',
          env: 'live',
        }),
      ).toBe('/hausa/bbc_hausa_radio/schedule.json');
    });
    it('should return endpoint with query string on test', () => {
      expect(
        getRadioScheduleEndpoint({
          service: 'hausa',
          queryString: 'renderer_env=live',
          env: 'test',
        }),
      ).toBe('/hausa/bbc_hausa_radio/schedule.json?renderer_env=live');
    });
    it('should return endpoint with query string on local', () => {
      expect(
        getRadioScheduleEndpoint({
          service: 'hausa',
          queryString: 'renderer_env=live',
          env: 'local',
        }),
      ).toBe('/hausa/bbc_hausa_radio/schedule.json?renderer_env=live');
    });
    it('should return with query string when passed service & radioService', () => {
      expect(
        getRadioScheduleEndpoint({
          service: 'persian',
          radioService: 'dari',
          queryString: 'renderer_env=live',
          env: 'test',
        }),
      ).toBe('/persian/bbc_dari_radio/schedule.json?renderer_env=live');
    });
  });
});

describe('getLocalRadioScheduleEndpoint', () => {
  it('should return endpoint when passed service', () => {
    expect(getLocalRadioScheduleEndpoint({ service: 'hausa' })).toBe(
      './data/hausa/bbc_hausa_radio/schedule.json',
    );
  });
  it('should return endpoint when passed service & radioService', () => {
    expect(
      getLocalRadioScheduleEndpoint({
        service: 'persian',
        radioService: 'dari',
      }),
    ).toBe('./data/persian/bbc_dari_radio/schedule.json');
  });
});

describe('getLink', () => {
  it('should return program link when state is live', () => {
    expect(
      getLink({
        service: 'persian',
        currentState: 'live',
        programServiceId: 'bbc_dari_radio',
        broadcastPid: 'p07zbtbf',
      }),
    ).toBe('/persian/bbc_dari_radio/liveradio');
  });
  it('should return liveradio link when state is not live', () => {
    expect(
      getLink({
        service: 'persian',
        currentState: 'anyotherstate',
        programServiceId: 'bbc_dari_radio',
        broadcastPid: 'p07zbtbf',
      }),
    ).toBe('/persian/bbc_dari_radio/p07zbtbf');
  });
});
