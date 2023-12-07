import {
  getPassportHome,
  isValidPassportHome,
  getCanonicalUrl,
  matchesCanonicalUrl,
} from '#lib/utilities/passport';
import { OK, NOT_FOUND } from '#lib/statusCodes.const';
import { ARTICLE_PAGE } from '../../../../../routes/utils/pageTypes';

// checks for pageData, 200 status and if home service from article data fits the service locale
const shouldRender = (
  { pageData, status },
  service,
  pathName,
  pageType,
  passportHomesOverride = [],
) => {
  let statusCode = status;

  const hasDataAnd200Status = pageData && status === OK;

  if (hasDataAnd200Status) {
    const passportHome = getPassportHome(pageData);
    const isValidService = isValidPassportHome(
      passportHome,
      service,
      passportHomesOverride,
    );

    const isValidArticle = () => {
      if (pageType === ARTICLE_PAGE) {
        const canonicalUrl = getCanonicalUrl(pageData);
        if (service === 'sport') {
          return matchesCanonicalUrl(canonicalUrl, pathName);
        }
        if (!canonicalUrl) return false;
      }
      return true;
    };
    const isValidRequest = isValidService && isValidArticle();
    statusCode = isValidRequest ? status : NOT_FOUND;
  }
  const hasRequestSucceeded = hasDataAnd200Status && statusCode !== NOT_FOUND;

  return {
    hasRequestSucceeded,
    status: statusCode,
  };
};

export default shouldRender;
