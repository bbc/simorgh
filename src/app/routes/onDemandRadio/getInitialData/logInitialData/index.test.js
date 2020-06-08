import path from 'ramda/src/path';
import { parsePageIdentifier } from '.';
import onDemandRadioEpisodeJson from '#data/pashto/bbc_pashto_radio/w3ct0lz1';
import onDemandRadioBrandJson from '#data/indonesia/bbc_indonesian_radio/w13xtt0s';

describe('Logging get initial data', () => {
  it('should return a valid uri for episode page', () => {
    const pageIdentifier = path(
      ['metadata', 'analyticsLabels', 'pageIdentifier'],
      onDemandRadioEpisodeJson,
    );
    const url = parsePageIdentifier(pageIdentifier);

    const service = path(
      ['relatedContent', 'site', 'name'],
      onDemandRadioEpisodeJson,
    ).toLowerCase();
    const masterBrand = path(
      ['metadata', 'createdBy'],
      onDemandRadioEpisodeJson,
    );
    const pid = path(['promo', 'locators', 'pid'], onDemandRadioEpisodeJson);

    expect(url).toEqual(`${service}/${masterBrand}/${pid}`);
  });

  it('should return a valid uri for brand page', () => {
    const pageIdentifier = path(
      ['metadata', 'analyticsLabels', 'pageIdentifier'],
      onDemandRadioBrandJson,
    );
    const url = parsePageIdentifier(pageIdentifier);

    const service = path(
      ['relatedContent', 'site', 'name'],
      onDemandRadioBrandJson,
    ).toLowerCase();
    const masterBrand = path(['metadata', 'createdBy'], onDemandRadioBrandJson);
    const pid = path(['promo', 'locators', 'brandPid'], onDemandRadioBrandJson);

    expect(url).toEqual(`${service}/${masterBrand}/programmes/${pid}`);
  });
});
