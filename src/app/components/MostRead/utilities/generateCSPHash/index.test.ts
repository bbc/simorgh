import generateCSPHash from '.';

describe('generateCSPHash', () => {
  it('should return hash when given script, hash, encoding and base', () => {
    const expectedResult =
      'sha384--F6x183GlrCHxr-nkHDtkl5tImpLwkdxCsV5pqCvCF0KWltti5z6aVn9FpqxIQEY';
    const exampleScript = `const somefunction = () => {}`;

    const result = generateCSPHash({
      script: exampleScript,
      sha: 'sha384',
      encoding: 'utf8',
      base: 'base64',
    });

    expect(result).toEqual(expectedResult);
  });

  it('should return undefined when script is null', () => {
    const exampleScript = null;

    const result = generateCSPHash({
      // @ts-expect-error script should never be null, this test is exercising the error handling logic
      script: exampleScript,
      sha: 'sha384',
      encoding: 'utf8',
      base: 'base64',
    });

    expect(result).toEqual(undefined);
  });

  it('should return undefined when hash is null', () => {
    const exampleScript = `const somefunction = () => {}`;

    const result = generateCSPHash({
      script: exampleScript,
      // @ts-expect-error sha should never be null, this test is exercising the error handling logic
      sha: null,
      encoding: 'utf8',
      base: 'base64',
    });

    expect(result).toEqual(undefined);
  });

  it('should return hash when encoding is null', () => {
    const expectedResult =
      'sha384--F6x183GlrCHxr-nkHDtkl5tImpLwkdxCsV5pqCvCF0KWltti5z6aVn9FpqxIQEY';
    const exampleScript = `const somefunction = () => {}`;

    const result = generateCSPHash({
      script: exampleScript,
      sha: 'sha384',
      // @ts-expect-error encoding should never be null, this test is exercising the error handling logic
      encoding: null,
      base: 'base64',
    });

    expect(result).toEqual(expectedResult);
  });

  it('should return undefined when base is null', () => {
    const exampleScript = `const somefunction = () => {}`;

    const result = generateCSPHash({
      script: exampleScript,
      sha: 'sha384',
      encoding: 'utf8',
      // @ts-expect-error base should never be null, this test is exercising the error handling logic
      base: null,
    });

    expect(result).toEqual(undefined);
  });
});
