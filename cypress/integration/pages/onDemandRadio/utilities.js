/* eslint-disable no-console */
import fetch from 'isomorphic-fetch';
import path from 'ramda/src/path';
import envConfig from '../../../support/config/envs';

// the externalId `bbc_oromo_radio` is overriden to `bbc_afaanoromoo` in production code
const getBrandId = externalId => {
  return externalId === 'bbc_oromo_radio'
    ? 'bbc_afaanoromoo_radio'
    : externalId;
};

export const getEmbedUrl = ({ jsonData, service, language }) => {
  const externalId = jsonData.metadata.createdBy;
  const brandId = getBrandId(externalId);
  const { pid } = jsonData.metadata.locators;

  return [
    envConfig.avEmbedBaseUrl,
    'ws/av-embeds/media',
    service,
    brandId,
    pid,
    language,
  ].join('/');
};

export const hasMedia = jsonData => {
  return path(
    ['content', 'blocks', '0', 'versions', '0', 'availableUntil'],
    jsonData,
  );
};

export const getEpisodeId = async pathToPage => {
  // Get the latest episode for this service from live
  const serviceAndMasterBrand = pathToPage.substring(
    0,
    pathToPage.indexOf('$latestEpisodeId'),
  );
  const scheduleDataPath = `https://www.bbc.com${serviceAndMasterBrand}schedule.json`;

  const episodeId = await fetch(`${scheduleDataPath}`)
    .then(result => {
      let jsonData;
      if (result.ok) {
        jsonData = result.json();
      }
      return jsonData;
    })
    .then(scheduleJsonData => scheduleJsonData.schedules[0].episode.pid)
    .catch(console.error);

  return episodeId;
};

export const isExpired = jsonData => {
  const episodeAvailableUntil = path(
    ['content', 'blocks', '0', 'versions', '0', 'availableUntil'],
    jsonData,
  );

  // Episode is expired if availableUntil is empty
  return !episodeAvailableUntil || episodeAvailableUntil < Date.now();
};

export const dataEndpointOverride = () => {
  if (Cypress.env('APP_ENV') === 'test') {
    return '?renderer_env=live';
  }
  return '';
};
