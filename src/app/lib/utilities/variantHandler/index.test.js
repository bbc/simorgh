import { variantSanitiser, articleVariantOverride, getVariant } from '.';

describe('variantSanitiser', () => {
  it('should remove leading slash', () => {
    expect(variantSanitiser('/foobar')).toEqual('foobar');
  });

  it('should not change output if no leading slash provided', () => {
    expect(variantSanitiser('foobar')).toEqual('foobar');
  });
});

describe('articleVariantOverride', () => {
  it('should return default variant if variant is null and page type is article', () => {
    expect(
      articleVariantOverride({
        service: 'uzbek',
        variant: null,
        pageType: 'article',
      }),
    ).toEqual('cyr');
  });

  it('should return variant if variant is null and page type is not article', () => {
    expect(
      articleVariantOverride({
        service: 'uzbek',
        variant: null,
        pageType: 'home',
      }),
    ).toEqual(null);
  });

  it('should return variant if variant is provided and page type is article', () => {
    expect(
      articleVariantOverride({
        service: 'uzbek',
        variant: 'lat',
        pageType: 'article',
      }),
    ).toEqual('lat');
  });

  it('should return variant if service is not uzbek', () => {
    expect(
      articleVariantOverride({
        service: 'serbian',
        variant: 'null',
        pageType: 'article',
      }),
    ).toEqual('null');
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

  it('should return "default" for service with optional variants if no variant is passed', () => {
    expect(getVariant({ service: 'uzbek', variant: '' })).toEqual('default');
  });

  it('should return "default" when service without variants is passed', () => {
    expect(getVariant({ service: 'news', variant: 'simp' })).toEqual('default');
  });
});
