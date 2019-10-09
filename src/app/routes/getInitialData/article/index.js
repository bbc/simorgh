import pathOr from 'ramda/src/pathOr';
import onClient from '#lib/utilities/onClient';
import { variantSanitiser } from '#lib/utilities/variantHandler';
import applyTimestampRules from '#lib/utilities/preprocessor/rules/timestamp';
import addIdsToBlocks from '#lib/utilities/preprocessor/rules/addIdsToBlocks';
import applyBlockPositioning from '#lib/utilities/preprocessor/rules/blockPositioning';
import getBaseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';
import pathnames from '../../config/pathnames';

const getArticleInitialData = async ({ id, service, variant }) => {
  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const processedVariant = variantSanitiser(variant);

  const pathname = pathOr('articles', [service, 'articles'], pathnames);

  const url = processedVariant
    ? `${baseUrl}/${service}/${pathname}/${id}/${processedVariant}.json`
    : `${baseUrl}/${service}/${pathname}/${id}.json`;

  return fetchData({
    url,
    preprocessorRules: [
      applyTimestampRules,
      addIdsToBlocks,
      applyBlockPositioning,
    ],
  });
};

export default getArticleInitialData;
