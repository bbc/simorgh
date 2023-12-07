import {
  getPassportHome,
  isValidPassportHome,
  getCanonicalUrl,
  matchesCanonicalUrl,
} from '#lib/utilities/passport';
import { ARTICLE_PAGE } from '../../../../../routes/utils/pageTypes';

// checks for pageData, 200 status and if home service from article data fits the service locale
const shouldRender = (
  { pageData, status },
  service,
  pathName,
  pageType,
  passportHomesOverride = [],
) => {
  let isValidRequest;

  const hasDataAnd200Status = pageData && status === 200;

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
    isValidRequest = isValidService && isValidArticle();
  } else {
    isValidRequest = false;
  }

  const hasRequestSucceeded = isValidRequest;
  const statusCode = isValidRequest ? status : 404;

  return {
    hasRequestSucceeded,
    status: statusCode,
  };
};

export default shouldRender;
