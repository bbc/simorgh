import getOriginCode from './originCode';

describe('getOriginCode', () => {
  it('should return the origin code give a valid path', () => {
    const path = '/cpsprodpb/FFC1/production/_107437456_177a9008.jpg';
    const originCode = getOriginCode(path);

    expect(originCode).toEqual('cpsprodpb');
  });

  it('should return null when path is invalid', () => {
    expect(getOriginCode()).toBeNull();
    expect(getOriginCode('path')).toBeNull();
  });
});
