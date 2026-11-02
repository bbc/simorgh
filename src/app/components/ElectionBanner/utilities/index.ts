import { Tag } from '#app/components/Metadata/types';
import { MetadataTaggings } from '#app/models/types/metadata';

const SENSITIVE_ARTICLE_ID = 'f2b5dd0e-dda0-454c-893d-792d46ff48c3';

type IsElectionBannerVisibleArgs = {
  aboutTags?: Tag[];
  curationIds?: string[];
  electionBannerEnabled: boolean | null;
  electionCurationIds?: string[];
  electionThingIds?: string[];
  taggings?: MetadataTaggings;
};

// isLite/isLive are deliberately not considered here; ElectionBanner guards against those itself.
const isElectionBannerVisible = ({
  aboutTags,
  curationIds,
  electionBannerEnabled,
  electionCurationIds,
  electionThingIds,
  taggings,
}: IsElectionBannerVisibleArgs): boolean => {
  const isEditoriallySensitive = taggings?.some(({ value }) =>
    value.includes(SENSITIVE_ARTICLE_ID),
  );

  const hasMatchingTagging = taggings?.some(({ value }) =>
    electionThingIds?.some(electionThingId => value.includes(electionThingId)),
  );

  const hasMatchingAboutTag = aboutTags?.some(({ thingId }) =>
    electionThingIds?.includes(thingId),
  );

  const hasMatchingCurationId = curationIds?.some(curationId =>
    electionCurationIds?.includes(curationId),
  );

  const hasValidElectionTag = Boolean(
    hasMatchingAboutTag || hasMatchingTagging || hasMatchingCurationId,
  );

  return Boolean(
    !isEditoriallySensitive && hasValidElectionTag && electionBannerEnabled,
  );
};

export default isElectionBannerVisible;
