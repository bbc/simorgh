import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import derivePageType from '#utilities/derivePageType';
import transformAnchorTags from '#utilities/transformAnchorTags';

type Fn = (html: string) => string;

const pipe =
  (...fns: Fn[]) =>
  (x: string) =>
    fns.reduce((result, nextFn) => nextFn(result), x);

export default pipe(
  transformAnchorTags({
    extension: 'app',
    isEligiblePath: pathname => derivePageType(pathname) === ARTICLE_PAGE,
  }),
);
