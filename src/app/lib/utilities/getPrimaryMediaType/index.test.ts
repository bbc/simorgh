import getPrimaryMediaType from '.';

describe('getPrimaryMediaType', () => {
  it('should return "audio" when the primaryMediaType tagging value is the audio thing id', () => {
    const taggings = [
      {
        predicate: 'http://www.bbc.co.uk/ontologies/bbc/primaryMediaType',
        value:
          'http://www.bbc.co.uk/things/fe1fbc8a-bb44-4bf8-8b12-52e58c6345a4#id',
      },
    ];

    expect(getPrimaryMediaType(taggings)).toBe('audio');
  });

  it('should return "video" when the primaryMediaType tagging value is the video thing id', () => {
    const taggings = [
      {
        predicate: 'http://www.bbc.co.uk/ontologies/bbc/primaryMediaType',
        value:
          'http://www.bbc.co.uk/things/ffc98bca-8cff-4ee6-9beb-a6ff6ef3ef9f#id',
      },
    ];

    expect(getPrimaryMediaType(taggings)).toBe('video');
  });

  it('should return undefined when there is no primaryMediaType tagging', () => {
    const taggings = [
      {
        predicate: 'http://www.bbc.co.uk/ontologies/bbc/infoClass',
        value: 'http://www.bbc.co.uk/things/some-other-id#id',
      },
    ];

    expect(getPrimaryMediaType(taggings)).toBeUndefined();
  });

  it('should return undefined when the primaryMediaType tagging value does not match a known thing id', () => {
    const taggings = [
      {
        predicate: 'http://www.bbc.co.uk/ontologies/bbc/primaryMediaType',
        value: 'http://www.bbc.co.uk/things/unknown-thing-id#id',
      },
    ];

    expect(getPrimaryMediaType(taggings)).toBeUndefined();
  });

  it('should return undefined when taggings is undefined', () => {
    expect(getPrimaryMediaType(undefined)).toBeUndefined();
  });

  it('should return undefined when taggings is an empty array', () => {
    expect(getPrimaryMediaType([])).toBeUndefined();
  });
});
