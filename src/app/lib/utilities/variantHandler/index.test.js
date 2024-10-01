import { variantSanitiser, getVariant } from '.';

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

  it('should return service default when no variant is passed for service with variants', () => {
    expect(getVariant({ service: 'uzbek', variant: null })).toEqual('cyr');
  });

  it('should return "default" when service without variants is passed', () => {
    expect(getVariant({ service: 'news', variant: 'simp' })).toEqual('default');
  });
});
