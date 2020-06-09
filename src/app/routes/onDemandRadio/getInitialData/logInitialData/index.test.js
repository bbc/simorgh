import path from 'ramda/src/path';
import assocPath from 'ramda/src/assocPath';
import loggerMock from '#testHelpers/loggerMock';
import { parsePageIdentifier } from '.';
import { RADIO_EPISODE_EXPIRED } from '#lib/logger.const';
import getInitialData from '..';
import onDemandRadioEpisodeJson from '#data/pashto/bbc_pashto_radio/w3ct0lz1';
import onDemandRadioBrandJson from '#data/indonesia/bbc_indonesian_radio/w13xtt0s';

describe('Logging get initial data', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it('logs the correct message when the on demand radio episode is expired', async () => {
    const responseWithoutVersions = assocPath(
      ['content', 'blocks', 0, 'versions'],
      [],
      onDemandRadioEpisodeJson,
    );
    fetch.mockResponse(JSON.stringify(responseWithoutVersions));
    await getInitialData('mock-on-demand-radio-path');
    expect(loggerMock.info).toHaveBeenCalledWith(RADIO_EPISODE_EXPIRED, {
      url: 'pashto/bbc_pashto_radio/w3ct0lz1',
    });
  });

  it('does not log anything when a radio episode is available', async () => {
    const oneMinuteAgo = Date.now() - 60 * 1000;
    const responseWithEpisodeAvailableOneMinuteAgo = assocPath(
      ['content', 'blocks', '0', 'versions', '0', 'availableFrom'],
      oneMinuteAgo,
      onDemandRadioEpisodeJson,
    );
    fetch.mockResponse(
      JSON.stringify(responseWithEpisodeAvailableOneMinuteAgo),
    );

    expect(loggerMock.info).not.toHaveBeenCalled();
  });
});
