import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import { ComponentExperimentProps } from '#app/models/types/global';
import { TopicTag } from '#app/models/types/metadata';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import styles from './index.styles';

interface TopicTagsProps {
  tags: Pick<TopicTag, 'topicName' | 'topicId'>[];
  experimentProps?: ComponentExperimentProps;
}

type TopicTagLinkProps = {
  tag: Pick<TopicTag, 'topicName' | 'topicId'>;
  href: string;
  position: number;
  eventTrackingData: EventTrackingData;
};

const TopicTagLink = ({
  tag,
  href,
  position,
  eventTrackingData,
}: TopicTagLinkProps) => {
  const clickTrackerHandler = useClickTrackerHandler({
    ...eventTrackingData,
    itemTracker: {
      type: 'topics-link',
      text: tag.topicName,
      position,
      resourceId: tag.topicId,
    },
  });

  return (
    <a href={href} {...clickTrackerHandler}>
      {tag.topicName}
    </a>
  );
};

export const TopicTags = ({ tags, experimentProps }: TopicTagsProps) => {
  const componentName = 'topics';
  const { service, translations } = use(ServiceContext);
  const { variant } = use(RequestContext);
  const heading = translations?.relatedTopics ?? 'Related Topics';
  const eventTrackingData = {
    componentName,
    groupTracker: {
      name: heading,
      type: componentName,
      itemCount: tags.length,
    },
    ...(experimentProps && experimentProps),
  };

  const viewTracker = useViewTracker(eventTrackingData);

  if (tags?.length === 0) return null;

  const getTopicPageUrl = (id: string) => {
    const isPublicService = ['news', 'cymrufyw', 'naidheachdan'];
    const hostname = `https://www.bbc.${isPublicService.includes(service) ? 'co.uk' : 'com'}`;
    const topicsPath = translations?.topicsPath ?? 'topics';

    return `${hostname}/${service}/${topicsPath}/${id}${variant ? `/${variant}` : ''}`;
  };

  const hasMultiple = tags.length > 1;

  return hasMultiple ? (
    <ul
      role="list"
      css={styles.topicsList}
      data-testid="topic-tags-multiple"
      {...viewTracker}
    >
      {tags.map((tag, index) => (
        <li key={tag.topicId} css={styles.topicTagItem}>
          <TopicTagLink
            tag={tag}
            href={getTopicPageUrl(tag.topicId)}
            position={index + 1}
            eventTrackingData={eventTrackingData}
          />
        </li>
      ))}
    </ul>
  ) : (
    <div
      css={styles.singleContainer}
      data-testid="topic-tags-single"
      {...viewTracker}
    >
      <div css={styles.topicTagItem}>
        <TopicTagLink
          tag={tags[0]}
          href={getTopicPageUrl(tags[0].topicId)}
          position={1}
          eventTrackingData={eventTrackingData}
        />
      </div>
    </div>
  );
};

export default TopicTags;
