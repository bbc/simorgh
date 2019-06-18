import getPassportHome from '.';

describe('getPassportHome', () => {
  const data = {
    metadata: {
      passport: {
        home: 'http://www.bbc.co.uk/ontologies/passport/home/News',
      },
    },
  };

  const invalidData = {
    metadata: {
      passport: {},
    },
  };

  it('should return valid service in good data', () => {
    const homeService = getPassportHome(data);

    expect(homeService).toEqual('news');
  });

  it('should return null if data is null or empty', () => {
    const homeService = getPassportHome({});

    expect(homeService).toEqual(null);
  });

  it('should return null if home is not in data', () => {
    const homeService = getPassportHome(invalidData);

    expect(homeService).toEqual(null);
  });
});
