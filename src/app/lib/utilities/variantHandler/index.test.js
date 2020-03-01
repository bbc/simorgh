import { variantSanitiser, getVariant, getOtherVariant } from '.';

describe('variantSanitiser', () => {
  it('should remove leading slash', () => {
    expect(variantSanitiser('/foobar')).toEqual('foobar');
  });

  it('should not change output if no leading slash provided', () => {
    expect(variantSanitiser('foobar')).toEqual('foobar');
  });
});

describe('getVariant', () => {
  it('should return variant if service has variant and inputs are correct', () => {
    expect(getVariant({ service: 'ukchina', variant: 'simp' })).toEqual('simp');
  });

  it('should return variant if service has variant and inputs variant has leading slash', () => {
    expect(getVariant({ service: 'ukchina', variant: '/simp' })).toEqual(
      'simp',
    );
  });

  it('should return service default when unknown variant passed for service with variants', () => {
    expect(getVariant({ service: 'serbian', variant: 'simp' })).toEqual('lat');
  });

  it('should return "default" when service without variants is passed', () => {
    expect(getVariant({ service: 'news', variant: 'simp' })).toEqual('default');
  });
});

describe('getOtherVariant', () => {
  it('should get correct variant for serbian', () => {
    expect(getOtherVariant({ service: 'serbian', variant: 'lat' })).toBe('cyr');
    expect(getOtherVariant({ service: 'serbian', variant: 'cyr' })).toBe('lat');
  });

  it('should get correct variant for ukchina', () => {
    expect(getOtherVariant({ service: 'ukchina', variant: 'simp' })).toBe(
      'trad',
    );
    expect(getOtherVariant({ service: 'ukchina', variant: 'trad' })).toBe(
      'simp',
    );
  });

  it('should get correct variant for zhongwen', () => {
    expect(getOtherVariant({ service: 'zhongwen', variant: 'simp' })).toBe(
      'trad',
    );
    expect(getOtherVariant({ service: 'zhongwen', variant: 'trad' })).toBe(
      'simp',
    );
  });

  it('should return null if no variant for service', () => {
    expect(getOtherVariant({ service: 'news', variant: 'simp' })).toBe(null);
    expect(getOtherVariant({ service: 'news' })).toBe(null);
  });
});
