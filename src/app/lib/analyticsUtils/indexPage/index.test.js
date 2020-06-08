import {
  getContentId,
  getLanguage,
  getPageIdentifier,
  getPageTitle,
  getContentType,
} from '.';

describe('getPageIdentifier', () => {
  const goodData = {
    metadata: {
      analyticsLabels: {
        counterName: 'SERVICE.page',
      },
    },
  };

  const badData = {
    metadata: {
      analyticsLabels: {
        iHaveNoCounterName: 'bwahahaha',
      },
    },
  };

  it('should find page identifier', () => {
    const pageid = getPageIdentifier(goodData);

    expect(pageid).toEqual('SERVICE.page');
  });

  it('should use "unknown" if counter name is not defined', () => {
    const pageid = getPageIdentifier(badData);

    expect(pageid).toEqual('unknown.page');
  });
});

describe('getContentId', () => {
  const goodData = {
    metadata: {
      locators: {
        curie:
          'http://www.bbc.co.uk/asset/b2ce8e02-168f-42c4-b78b-4780807445b4/desktop/domestic',
      },
    },
  };

  const badData = {
    metadata: {
      locators: {
        noCurie: 'oops',
      },
    },
  };

  const badCurie = {
    metadata: {
      locators: {
        curie: '555',
      },
    },
  };

  const nonGuid = {
    metadata: {
      locators: {
        curie: 'http://www.bbc.co.uk/asset/123/desktop/domestic',
      },
    },
  };

  it('should find the CPS asset id', () => {
    const contentid = getContentId(goodData);

    expect(contentid).toEqual(
      'urn:bbc:cps:b2ce8e02-168f-42c4-b78b-4780807445b4',
    );
  });

  it('should return null if there is no curie', () => {
    const contentid = getContentId(badData);

    expect(contentid).toBeNull();
  });

  it('should return null if the curie format is not recognised', () => {
    const contentid = getContentId(badCurie);

    expect(contentid).toBeNull();
  });

  it('should return null if the value in the curie is not a guid', () => {
    const contentid = getContentId(nonGuid);

    expect(contentid).toBeNull();
  });
});

describe('getLanguage', () => {
  const goodData = {
    metadata: {
      language: 'la',
    },
  };

  const badData = {
    metadata: {
      lang: 'al',
    },
  };

  it("should find the page's language", () => {
    const language = getLanguage(goodData);

    expect(language).toEqual('la');
  });

  it('should return null if language is not defined', () => {
    const language = getLanguage(badData);

    expect(language).toBeNull();
  });
});

describe('getPageTitle', () => {
  const goodData = {
    metadata: {
      title: 'Home',
    },
  };

  const badData = {
    metadata: {
      Home: 'title',
    },
  };

  const brandName = 'BRAND';

  it('should find the page title', () => {
    const title = getPageTitle(goodData, brandName);

    expect(title).toEqual('Home - BRAND');
  });

  it('should return null when there is no page title', () => {
    const title = getPageTitle(badData, brandName);

    expect(title).toBeNull();
  });
});

describe('getContentType', () => {
  it('should return index-home when pageType is frontPage', () => {
    const contentType = getContentType('frontPage');

    expect(contentType).toEqual('index-home');
  });

  it('should return index-section when pageType is IDX', () => {
    const contentType = getContentType('IDX');

    expect(contentType).toEqual('index-section');
  });

  it('should return null when pageType is not frontPage or IDX', () => {
    const contentType = getContentType('article');

    expect(contentType).toBeNull();
  });
});
