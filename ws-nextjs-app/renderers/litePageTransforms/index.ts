import transformAnchorTags from '#utilities/transformAnchorTags';
import transformImgTags from './transformImgTags';

const transformLiteAnchorTags = transformAnchorTags({ extension: 'lite' });

export default (html: string) =>
  transformImgTags(transformLiteAnchorTags(html));
