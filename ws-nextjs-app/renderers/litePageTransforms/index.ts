import transformAnchorTags from './transformAnchorTags';

type Fn = (html: string) => string;

const pipe =
  (...fns: Fn[]) =>
  (x: string) =>
    fns.reduce((result, nextFn) => nextFn(result), x);

export default pipe(transformAnchorTags);
