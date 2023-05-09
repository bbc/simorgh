import generateCPSHash from './generateCPSHash';

describe('generateCPSHash', () => {
  it('should return hash when given script, hash, encoding and base', () => {
    const expectedResult =
      'sha384--F6x183GlrCHxr-nkHDtkl5tImpLwkdxCsV5pqCvCF0KWltti5z6aVn9FpqxIQEY';
    const exampleScript = `const somefunction = () => {}`;

    const result = generateCPSHash(exampleScript, 'sha384', 'utf8', 'base64');

    expect(result).toEqual(expectedResult);
  });

  it('should return null when script is null', () => {
    const exampleScript = null;

    const result = generateCPSHash(exampleScript, 'sha384', 'utf8', 'base64');

    expect(result).toEqual(null);
  });

  it('should return null when hash is null', () => {
    const exampleScript = `const somefunction = () => {}`;

    const result = generateCPSHash(exampleScript, null, 'utf8', 'base64');

    expect(result).toEqual(null);
  });

  it('should return hash when encoding is null', () => {
    const expectedResult =
      'sha384--F6x183GlrCHxr-nkHDtkl5tImpLwkdxCsV5pqCvCF0KWltti5z6aVn9FpqxIQEY';
    const exampleScript = `const somefunction = () => {}`;

    const result = generateCPSHash(exampleScript, 'sha384', null, 'base64');

    expect(result).toEqual(expectedResult);
  });

  it('should return null when base is null', () => {
    const exampleScript = `const somefunction = () => {}`;

    const result = generateCPSHash(exampleScript, 'sha384', 'utf8', null);

    expect(result).toEqual(null);
  });
});
