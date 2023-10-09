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
  let statusCode = status;
  let isCorrectService;
  let isCanonicalUrlMatch = true;
  let isUrlValid = false;

  const hasDataAnd200Status = pageData && status === 200;
  if (hasDataAnd200Status) {
    const passportHome = getPassportHome(pageData);
    isCorrectService = isValidPassportHome(
      passportHome,
      service,
      passportHomesOverride,
    );
    if (service === 'sport' && pageType === ARTICLE_PAGE) {
      const canonicalUrl = getCanonicalUrl(pageData);
      isCanonicalUrlMatch = matchesCanonicalUrl(canonicalUrl, pathName);
    }
    isUrlValid = isCorrectService && isCanonicalUrlMatch;
    statusCode = !isUrlValid ? 404 : status;
  }

  return {
    hasData200StatusAndCorrectService: hasDataAnd200Status && isUrlValid,
    status: statusCode,
    pageData,
  };
};

export default shouldRender;
