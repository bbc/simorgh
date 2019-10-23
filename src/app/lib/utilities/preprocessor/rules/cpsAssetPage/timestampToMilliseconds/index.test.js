import timestampToMilliseconds from '.';

describe('timestampToMilliseconds', () => {
  it('should multiply timestamps by 1000 if version is less than 1.1.0', async () => {
    const input = {
      metadata: {
        firstPublished: 123456789,
        lastPublished: 987654321,
        version: 'v0.1.1',
      },
    };

    const expected = {
      metadata: {
        firstPublished: 123456789000,
        lastPublished: 987654321000,
        version: 'v0.1.1',
      },
    };

    expect(timestampToMilliseconds(input)).toEqual(expected);
  });

  it('should not multiply timestamps by 1000 if version is equal to 1.1.0', async () => {
    const input = {
      metadata: {
        firstPublished: 123456789000,
        lastPublished: 987654321000,
        version: 'v1.1.0',
      },
    };

    const expected = {
      metadata: {
        firstPublished: 123456789000,
        lastPublished: 987654321000,
        version: 'v1.1.0',
      },
    };

    expect(timestampToMilliseconds(input)).toEqual(expected);
  });

  it('should not multiply timestamps by 1000 if version is greater than 1.1.0', async () => {
    const input = {
      metadata: {
        firstPublished: 123456789000,
        lastPublished: 987654321000,
        version: 'v1.1.1',
      },
    };

    const expected = {
      metadata: {
        firstPublished: 123456789000,
        lastPublished: 987654321000,
        version: 'v1.1.1',
      },
    };

    expect(timestampToMilliseconds(input)).toEqual(expected);
  });
});
