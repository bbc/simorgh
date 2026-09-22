import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import createHrefExtensionTransform from '#utilities/createHrefExtensionTransform';
import derivePageType from '#utilities/derivePageType';

type Fn = (html: string) => string;

const pipe =
  (...fns: Fn[]) =>
  (x: string) =>
    fns.reduce((result, nextFn) => nextFn(result), x);

const transformAnchorTags = createHrefExtensionTransform({
  extension: 'app',
  isEligiblePath: pathname => derivePageType(pathname) === ARTICLE_PAGE,
});

export default pipe(transformAnchorTags);
