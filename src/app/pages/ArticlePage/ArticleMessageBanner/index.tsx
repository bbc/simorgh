import { use } from 'react';
import useToggle from '#app/hooks/useToggle';
import { Tag } from '#app/components/Metadata/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { MetadataTaggings } from '#app/models/types/metadata';
import { ArticleMessageBannerConfig } from '#app/models/types/serviceConfig';
import MessageBanner from '#app/components/MessageBanner';
import Text from '#app/components/Text';
import styles from './index.styles';

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
  bannerDefinition: ArticleMessageBannerConfig;
};

const ArticleMessageBanner = ({ aboutTags, taggings }: Props) => {
  const { articleMessageBanners } = use(ServiceContext);
  const { enabled: electionBannerEnabled }: ToggleType =
    useToggle('electionBanner');

  if (!articleMessageBanners?.length) return null;

  const matchingBanner = articleMessageBanners
    .map((bannerDefinition: ArticleMessageBannerConfig | undefined) => {
      if (!bannerDefinition) return null;

      const hasMatchingTag = aboutTags?.some(({ thingId }) =>
        bannerDefinition.thingIds.includes(thingId),
      );

      return hasMatchingTag ? { bannerDefinition } : null;
    })
    .find((bannerOrNull): bannerOrNull is MatchingBanner =>
      Boolean(bannerOrNull),
    );

  if (!matchingBanner) return null;

  const isEditoriallySensitive = taggings?.some(({ value }) =>
    value.includes(SENSITIVE_ARTICLE_ID),
  );

  if (isEditoriallySensitive || !electionBannerEnabled) return null;

  const { bannerDefinition } = matchingBanner;

  return (
    <div
      data-testid="article-message-banner"
      css={styles.articleMessageBannerWrapper}
    >
      <MessageBanner
        description={bannerDefinition.description}
        link={bannerDefinition.linkHref}
        linkText={bannerDefinition.linkText}
        image={bannerDefinition.image}
      >
        <Text
          as="strong"
          size="paragon"
          fontVariant="sansBold"
          css={styles.mainText}
        >
          {bannerDefinition.heading}
        </Text>
      </MessageBanner>
    </div>
  );
};

export default ArticleMessageBanner;
