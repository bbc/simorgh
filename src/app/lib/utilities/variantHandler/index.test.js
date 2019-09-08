import { variantSanitzer, variantDataKey } from '.';

describe('variantSanitzer', () => {
  it('should remove leading slash', () => {
    expect(variantSanitzer('/foobar')).toEqual('foobar');
  });

  it('should not change output if no leading slash provided', () => {
    expect(variantSanitzer('foobar')).toEqual('foobar');
  });
});

describe('variantDataKey', () => {
  it('should return variant if service has variant and inputs are correct', () => {
    expect(variantDataKey('ukchina', 'simp')).toEqual('simp');
  });

  it('should return variant if service has variant and inputs variant has leading slash', () => {
    expect(variantDataKey('ukchina', '/simp')).toEqual('simp');
  });

  it('should return service default when unknown variant passed for service with variants', () => {
    expect(variantDataKey('serbian', 'simp')).toEqual('lat');
  });

  it('should return "default" when service without variants is passed', () => {
    expect(variantDataKey('news', 'simp')).toEqual('default');
  });
});
