import timestampToMilliseconds from '.';

describe('addHeadlineBlock', () => {
  it('should multiply timestamps by 1000 if before 1980', async () => {
    const input = {
      metadata: {
        firstPublished: 123456789,
        lastPublished: 987654321,
      },
    };

    const expected = {
      metadata: {
        firstPublished: 123456789000,
        lastPublished: 987654321000,
      },
    };

    expect(timestampToMilliseconds(input)).toEqual(expected);
  });

  it('should multiply timestamps that exist', async () => {
    const input = {
      metadata: {
        lastPublished: 987654321,
      },
    };

    const expected = {
      metadata: {
        lastPublished: 987654321000,
      },
    };

    expect(timestampToMilliseconds(input)).toEqual(expected);
  });

  it('should not multiply timestamps by 1000 if after 1980', async () => {
    const input = {
      metadata: {
        firstPublished: 1564264928322,
        lastPublished: 1571610309123,
      },
    };

    expect(timestampToMilliseconds(input)).toEqual(input);
  });

  it('should do nothing if timestamps dont exist', async () => {
    const input = {
      metadata: {
        foobar: '123',
      },
    };

    expect(timestampToMilliseconds(input)).toEqual(input);
  });
});
