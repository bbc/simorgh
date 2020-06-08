import path from 'ramda/src/path';
import { parsePageIdentifier } from '.';
import onDemandRadioEpisodeJson from '#data/pashto/bbc_pashto_radio/w3ct0lz1';

fetch.mockResponse(JSON.stringify(onDemandRadioEpisodeJson));

describe('Logging getinitial data', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return a valid uri for episode page', () => {
    const pageIdentifier = path(
      ['metadata', 'analyticsLabels', 'pageIdentifier'],
      onDemandRadioEpisodeJson,
    );
    const service = path(
      ['relatedContent', 'site', 'name'],
      onDemandRadioEpisodeJson,
    ).toLowerCase();
    const masterBrand = path(
      ['metadata', 'createdBy'],
      onDemandRadioEpisodeJson,
    );
    const pid = path(['promo', 'locators', 'pid'], onDemandRadioEpisodeJson);

    const url = parsePageIdentifier(pageIdentifier);
    expect(url).toEqual(`${service}/${masterBrand}/${pid}`);
  });
});
