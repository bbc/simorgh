import {
  getContentId,
  getLanguage,
  getPageIdentifier,
  getPageTitle,
} from './frontpage';

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
      analyticsLabels: {
        cps_asset_id: '12345678',
      },
    },
  };

  const badData = {
    metadata: {
      analyticsLabels: {
        notACpsAssetId: 'muahahaha',
      },
    },
  };

  it('should find the CPS asset id', () => {
    const contentid = getContentId(goodData);

    expect(contentid).toEqual('12345678');
  });

  it('should return null if CPS asset id is not defined', () => {
    const contentid = getContentId(badData);

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

  it('should find the page title', () => {
    const title = getPageTitle(goodData);

    expect(title).toEqual('Home');
  });

  it('should return null when there is no page title', () => {
    const title = getPageTitle(badData);

    expect(title).toBeNull();
  });
});
