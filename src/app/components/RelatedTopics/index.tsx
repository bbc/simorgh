import { useContext } from 'react';
import SectionLabel from '#psammead/psammead-section-label/src';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import useViewTracker from '#hooks/useViewTracker';
import TopicTags, { TopicTag } from '#app/components/TopicTags';
import styles from './index.styles';

const eventTrackingData = {
  componentName: 'topics',
};

interface Topic {
  topicName: string;
  topicId: string;
}

interface RelatedTopicsProps {
  topics?: Topic[];
  mobileDivider?: boolean;
  bar?: boolean;
  className?: string;
  backgroundColour?: string;
  tagBackgroundColour?: string;
}

const RelatedTopics = ({
  topics = [],
  mobileDivider = true,
  bar = true,
  className = '',
  backgroundColour = '',
  tagBackgroundColour = '',
}: RelatedTopicsProps) => {
  const { service, script, translations, dir } = useContext(ServiceContext);
  const { variant } = useContext(RequestContext);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);
  const viewTracker = useViewTracker(eventTrackingData);

  const heading = translations?.relatedTopics ?? 'Related Topics';
  const topicsPath = translations?.topicsPath ?? 'topics';

  const getTopicPageUrl = (id: string) => {
    const isPublicService = ['news', 'cymrufyw', 'naidheachdan'];
    const hostname = `https://www.bbc.${isPublicService.includes(service) ? 'co.uk' : 'com'}`;

    return variant
      ? `${hostname}/${service}/${topicsPath}/${id}/${variant}`
      : `${hostname}/${service}/${topicsPath}/${id}`;
  };

  const shouldDisplayTopics =
    topics.length > 0 && !(service === 'zhongwen' && variant === 'simp');

  if (!shouldDisplayTopics) {
    return null;
  }

  return (
    <aside
      data-testid="related-topics"
      aria-labelledby="related-topics"
      role="complementary"
      className={className}
      css={styles.wrapper(backgroundColour)}
    >
      <SectionLabel
        bar={bar}
        script={script}
        service={service}
        dir={dir}
        labelId="related-topics"
        mobileDivider={mobileDivider}
        {...(backgroundColour && { backgroundColor: backgroundColour })}
        css={styles.sectionLabel}
      >
        {heading}
      </SectionLabel>
      <TopicTags
        service={service}
        script={script}
        {...(tagBackgroundColour && { tagBackgroundColour })}
      >
        {topics.length === 1
          ? topics.map(topic => (
              <TopicTag
                name={topic.topicName}
                link={getTopicPageUrl(topic.topicId)}
                {...clickTrackerHandler}
                {...viewTracker}
                key={topic.topicId}
              />
            ))
          : topics.map(({ topicName, topicId }) => (
              <TopicTag
                name={topicName}
                link={getTopicPageUrl(topicId)}
                {...clickTrackerHandler}
                {...viewTracker}
                key={topicId}
              />
            ))}
      </TopicTags>
    </aside>
  );
};

export default RelatedTopics;
