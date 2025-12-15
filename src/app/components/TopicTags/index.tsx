import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import { TopicTag } from '#app/models/types/metadata';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import styles from './index.styles';

const eventTrackingData = {
  componentName: 'topics',
};

export const TopicTags = ({
  tags,
}: {
  tags: Pick<TopicTag, 'topicName' | 'topicId'>[];
}) => {
  const viewTracker = useViewTracker(eventTrackingData);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  if (tags?.length === 0) return null;

  const { service, translations } = use(ServiceContext);
  const { variant } = use(RequestContext);

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
      {tags.map(tag => (
        <li key={tag.topicId} css={styles.topicTagItem}>
          <a href={getTopicPageUrl(tag.topicId)} {...clickTrackerHandler}>
            {tag.topicName}
          </a>
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
        <a href={getTopicPageUrl(tags[0].topicId)} {...clickTrackerHandler}>
          {tags[0].topicName}
        </a>
      </div>
    </div>
  );
};

export default TopicTags;
