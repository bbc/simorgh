import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import derivePageType from '#utilities/derivePageType';
import transformAnchorTags from '#utilities/transformAnchorTags';

export default transformAnchorTags({
  extension: 'app',
  isEligiblePath: pathname => derivePageType(pathname) === ARTICLE_PAGE,
});
