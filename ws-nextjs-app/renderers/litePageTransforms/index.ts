import createHrefExtensionTransform from '#utilities/createHrefExtensionTransform';

type Fn = (html: string) => string;

const pipe =
  (...fns: Fn[]) =>
  (x: string) =>
    fns.reduce((result, nextFn) => nextFn(result), x);

const transformAnchorTags = createHrefExtensionTransform({
  extension: 'lite',
});

export default pipe(transformAnchorTags);
