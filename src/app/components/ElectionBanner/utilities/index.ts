import isLive from '#app/lib/utilities/isLive';
import { MetadataTaggings } from '#app/models/types/metadata';

const SENSITIVE_ARTICLE_ID = 'f2b5dd0e-dda0-454c-893d-792d46ff48c3';

type IsElectionBannerVisibleArgs = {
  electionBannerEnabled: boolean | null;
  electionThingIds?: string[];
  isLite: boolean;
  taggings?: MetadataTaggings;
};

const isElectionBannerVisible = ({
  electionBannerEnabled,
  electionThingIds,
  isLite,
  taggings,
}: IsElectionBannerVisibleArgs): boolean => {
  if (isLive() || isLite) return false;

  const isEditoriallySensitive = taggings?.some(({ value }) =>
    value.includes(SENSITIVE_ARTICLE_ID),
  );

  const hasValidTagLivePage = taggings?.some(({ value }) =>
    electionThingIds?.some(electionThingId => value.includes(electionThingId)),
  );

  return Boolean(
    !isEditoriallySensitive && hasValidTagLivePage && electionBannerEnabled,
  );
};

export default isElectionBannerVisible;
