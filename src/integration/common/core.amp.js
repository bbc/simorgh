export default () => {
  it('Core AMP scripts are loaded in the head of the document', () => {
    const ampScripts = [
      'https://cdn.ampproject.org/v0.js',
      'https://cdn.ampproject.org/v0/amp-geo-0.1.js',
      'https://cdn.ampproject.org/v0/amp-consent-0.1.js',
      'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
    ];

    ampScripts.forEach((ampScript) => {
      expect(
        amp.document.querySelector(`head script[src="${ampScript}"]`),
      ).toBeInTheDocument();
    });
  });

  it('AMP Geo config is loaded in the body', () => {
    expect(
      amp.document.querySelector(
        'body amp-geo > script[type="application/json"]',
      ).textContent,
    ).toBe(
      '{"ISOCountryGroups":{"eea":["at","ax","be","bg","bl","cy","cz","de","dk","ea","ee","es","fi","fr","gb","gf","gg","gi","gp","gr","hr","hu","ic","ie","im","is","it","je","li","lt","lu","lv","mf","mq","mt","nc","nl","no","pf","pl","pm","pt","re","ro","se","si","sj","sk","tf","va","wf","yt"]}}',
    );
  });

  it('AMP Consent config is loaded in the body', () => {
    expect(
      amp.document.querySelector(
        'body amp-consent > script[type="application/json"]',
      ).textContent,
    ).toBe(
      '{"consents":{"user-consent":{"promptIfUnknownForGeoGroup":"eea","promptUI":"consent-prompt"}}}',
    );
  });
};
