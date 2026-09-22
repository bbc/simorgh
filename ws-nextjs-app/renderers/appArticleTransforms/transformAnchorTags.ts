import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import createHrefExtensionTransform from '#utilities/createHrefExtensionTransform';
import derivePageType from '#utilities/derivePageType';

export default createHrefExtensionTransform({
  extension: 'app',
  isEligiblePath: pathname => derivePageType(pathname) === ARTICLE_PAGE,
});
