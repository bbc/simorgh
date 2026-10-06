import { MetadataTaggings } from '#app/models/types/metadata';

const AUDIO_THING_ID = 'fe1fbc8a-bb44-4bf8-8b12-52e58c6345a4';
const VIDEO_THING_ID = 'ffc98bca-8cff-4ee6-9beb-a6ff6ef3ef9f';

/**
 * Determines the primary media type of a page from its passport taggings,
 * using the `primaryMediaType` predicate. Returns 'audio' or 'video' only
 * when the tagging's thing id explicitly matches a known audio/video type,
 * otherwise undefined.
 */
const getPrimaryMediaType = (
  taggings?: MetadataTaggings,
): 'audio' | 'video' | undefined => {
  const primaryMediaTagging = taggings?.find(tagging =>
    tagging.predicate.includes('primaryMediaType'),
  );

  if (!primaryMediaTagging) return undefined;
  if (primaryMediaTagging.value.includes(AUDIO_THING_ID)) return 'audio';
  if (primaryMediaTagging.value.includes(VIDEO_THING_ID)) return 'video';

  return undefined;
};

export default getPrimaryMediaType;
