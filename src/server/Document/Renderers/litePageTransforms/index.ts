import transformAnchorTags from './transformAnchorTags';
import transformImgTags from './transformImgTags';

type Fn = (html: string) => string;

const pipe =
  (...fns: Fn[]) =>
  (x: string) =>
    fns.reduce((result, nextFn) => nextFn(result), x);

export default pipe(transformAnchorTags, transformImgTags);
