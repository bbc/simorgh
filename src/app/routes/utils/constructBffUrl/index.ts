import Url from 'url-parse';
import pipe from 'ramda/src/pipe';
import getEnvironment from '#app/routes/utils/getEnvironment';
import { getUrlPath } from '../../../lib/utilities/urlParser';
import handleError from '../handleError';

const removeAmp = (path: string) => path.split('.')[0];
const getOptimoId = (path: string) => path.match(/(c[a-zA-Z0-9]{10}o)/)?.[1];
const getCpsId = (path: string) => path;

const getId = (pageType: string) =>
  pipe(getUrlPath, removeAmp, pageType === 'cpsAsset' ? getCpsId : getOptimoId);

const constructBffUrl = ({
  pathname,
  pageType = 'topic',
  service,
  variant,
  page = {},
}) => {
  const env = getEnvironment(pathname);
  const isLocal = !env || env === 'local';

  const id = getId(pageType)(pathname);
  const capitlisedPageType = pageType.charAt(0).toUpperCase();

  if (!id) throw handleError(`${capitlisedPageType} ID is invalid`, 500);

  const queryParameters = {
    id,
    service,
    pageType,
    ...(variant && {
      variant,
    }),
    ...(page && {
      page,
    }),
  };

  let fetchUrl = Url(process.env.BFF_PATH as string).set(
    'query',
    queryParameters,
  );

  if (isLocal) {
    switch (pageType) {
      case 'article':
        fetchUrl = Url(
          `/${service}/articles/${id}${variant ? `/${variant}` : ''}`,
        );
        break;
      case 'cpsAsset':
        fetchUrl = Url(id);
        break;
      default: {
        const variantPath = variant ? `/${variant}` : '';
        fetchUrl = Url(`/${service}${variantPath}/topics/${id}`);
        break;
      }
    }
  }

  return fetchUrl;
};

export default constructBffUrl;
