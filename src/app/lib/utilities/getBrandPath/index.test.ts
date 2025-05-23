import { Services, Variants } from '#app/models/types/global';
import getBrandPath from './index';

describe('getBrandPath', () => {
  it('should return ws/languages for WS service', () => {
    const result = getBrandPath('ws' as Services);
    expect(result).toEqual({
      service: 'ws/languages',
    });
  });

  it('should return service with variant for services that support variants', () => {
    const result = getBrandPath('serbian' as Services, 'lat' as Variants);
    expect(result).toEqual({
      service: 'serbian',
      variant: 'lat',
    });
  });

  it('should return service without variant for services that do not support variants', () => {
    const result = getBrandPath('news' as Services);
    expect(result).toEqual({
      service: 'news',
    });
  });

  it('should return service without variant when variant is undefined', () => {
    const result = getBrandPath('serbian' as Services, undefined);
    expect(result).toEqual({
      service: 'serbian',
    });
  });

  it('should return service without variant when variant is not valid for the service', () => {
    const result = getBrandPath('serbian' as Services, 'simp' as Variants);
    expect(result).toEqual({
      service: 'serbian',
    });
  });
});
