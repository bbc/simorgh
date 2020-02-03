import timestampToMilliseconds from '.';

describe('timestampToMilliseconds - metadata', () => {
  it('should multiply timestamps by 1000 if before the minimum date', async () => {
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

  it('should not multiply timestamps by 1000 if after the minimum date', async () => {
    const input = {
      metadata: {
        firstPublished: 123456789000,
        lastPublished: 987654321000,
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

  it('should handle each date individually', async () => {
    const input = {
      metadata: {
        firstPublished: 123456789000,
        lastPublished: 123456789,
        lastUpdated: 123456789,
      },
    };

    const expected = {
      metadata: {
        firstPublished: 123456789000,
        lastPublished: 123456789000,
        lastUpdated: 123456789000,
      },
    };

    expect(timestampToMilliseconds(input)).toEqual(expected);
  });
});

describe('timestampToMilliseconds - related content', () => {
  it('should convert timestamps from seconds to milliseconds', async () => {
    const input = {
      relatedContent: {
        groups: [
          {
            type: 'see-alsos',
            promos: [
              {
                timestamp: 123456789,
              },
              {
                timestamp: 987654321000,
              },
            ],
          },
        ],
      },
    };

    const expected = {
      relatedContent: {
        groups: [
          {
            type: 'see-alsos',
            promos: [
              {
                timestamp: 123456789000,
              },
              {
                timestamp: 987654321000,
              },
            ],
          },
        ],
      },
    };

    expect(timestampToMilliseconds(input)).toEqual(expected);
  });
});
