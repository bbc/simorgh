import {
  getPassportHome,
  isValidPassportHome,
  getCanonicalUrl,
  matchesCanonicalUrl,
} from '#lib/utilities/passport';
import { OK, NOT_FOUND } from '#lib/statusCodes.const';
import { ARTICLE_PAGE } from '#routes/utils/pageTypes';

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
      // Only check against Optimo Article pages
      if (pageType !== ARTICLE_PAGE) return true;

      if (service === 'sport') {
        const canonicalUrl = getCanonicalUrl(pageData);
        return matchesCanonicalUrl(canonicalUrl, pathName);
      }

      // Check tagging to see if article is a 'Key/Summary Points' article
      const isKeyPointsArticle = pageData?.metadata?.passport?.taggings?.some(
        tag =>
          tag.predicate ===
            'http://www.bbc.co.uk/ontologies/creativework/format' &&
          tag.value ===
            'http://www.bbc.co.uk/things/6b6d33cc-3e32-43e6-b06f-d43e71d44bad#id',
      );

      // If article is a 'Key/Summary Points' article then we don't want to show it
      if (isKeyPointsArticle) return false;

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
