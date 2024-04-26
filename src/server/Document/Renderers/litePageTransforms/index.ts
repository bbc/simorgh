import transformAnchorTags from './transformAnchorTags';

type Fn = (html: string) => string;

const pipe =
  (...fns: Fn[]) =>
  (x: string) =>
    fns.reduce((v, f) => f(v), x);

export default pipe(transformAnchorTags);
