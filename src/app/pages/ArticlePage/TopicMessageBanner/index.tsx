import { use } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import useToggle from '#app/hooks/useToggle';
import { Tag } from '#app/components/Metadata/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { MetadataTaggings } from '#app/models/types/metadata';
import { TopicMessageBannerConfig } from '#app/models/types/serviceConfig';
import MessageBanner from '#app/components/MessageBanner';

type Props = {
  aboutTags: Tag[];
  taggings: MetadataTaggings;
};

type ToggleType = {
  enabled: boolean | null;
  value: string | null;
};

const SENSITIVE_ARTICLE_ID = 'f2b5dd0e-dda0-454c-893d-792d46ff48c3';

type MatchingBanner = {
  bannerDefinition: TopicMessageBannerConfig;
};

export default function TopicMessageBanner({ aboutTags, taggings }: Props) {
  const { topicMessageBanners } = use(ServiceContext);
  const { isLite } = use(RequestContext);
  const { enabled: electionBannerEnabled }: ToggleType =
    useToggle('electionBanner');

  if (isLite || !topicMessageBanners?.length) return null;

  const matchResult = topicMessageBanners
    .map((bannerDefinition: TopicMessageBannerConfig | undefined) => {
      if (!bannerDefinition) return null;

      const hasMatchingTag = aboutTags?.some(({ thingId }) =>
        bannerDefinition.thingIds.includes(thingId),
      );

      return hasMatchingTag ? { bannerDefinition } : null;
    })
    .find((candidate): candidate is MatchingBanner => Boolean(candidate));

  if (!matchResult) return null;

  const isEditoriallySensitive = taggings?.some(({ value }) =>
    value.includes(SENSITIVE_ARTICLE_ID),
  );

  if (isEditoriallySensitive || !electionBannerEnabled) return null;

  const { bannerDefinition } = matchResult;

  return (
    <MessageBanner
      id="topic-message-banner"
      heading={bannerDefinition.heading}
      description={bannerDefinition.description}
      link={bannerDefinition.linkHref}
      linkText={bannerDefinition.linkText}
      image={bannerDefinition.image}
    />
  );
}
