import { useContext } from 'react';
import SectionLabel from '#psammead/psammead-section-label/src';
import { GREY_2 } from '#app/components/ThemeProvider/palette';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import useViewTracker from '#hooks/useViewTracker';
import TopicTags, { TopicTag } from '#app/components/TopicTags';
import { TopicTag as TopicTagType } from '#app/models/types/metadata';
import styles from './index.styles';

const eventTrackingData = {
  componentName: 'topics',
};

interface RelatedTopicsProps {
  topics: Pick<TopicTagType, 'topicName' | 'topicId'>[];
  mobileDivider?: boolean;
  bar?: boolean;
  className?: string;
}

const RelatedTopics = ({
  topics = [],
  mobileDivider = true,
  bar = true,
  className = '',
}: RelatedTopicsProps) => {
  const { service, script, translations, dir } = useContext(ServiceContext);
  const { variant } = useContext(RequestContext);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);
  const viewTracker = useViewTracker(eventTrackingData);

  const shouldDisplayTopics =
    topics.length > 0 && !(service === 'zhongwen' && variant === 'simp');

  if (!shouldDisplayTopics) return null;

  const heading = translations?.relatedTopics ?? 'Related Topics';
  const topicsPath = translations?.topicsPath ?? 'topics';

  const getTopicPageUrl = (id: string) => {
    const isPublicService = ['news', 'cymrufyw', 'naidheachdan'];
    const hostname = `https://www.bbc.${isPublicService.includes(service) ? 'co.uk' : 'com'}`;

    return `${hostname}/${service}/${topicsPath}/${id}${variant ? `/${variant}` : ''}`;
  };

  const topicTagItems = topics.map(({ topicName, topicId }) => (
    <TopicTag
      name={topicName}
      link={getTopicPageUrl(topicId)}
      {...clickTrackerHandler}
      {...viewTracker}
      key={topicId}
    />
  ));

  return (
    <aside
      data-testid="related-topics"
      aria-labelledby="related-topics"
      role="complementary"
      className={className}
      css={styles.wrapper}
    >
      <SectionLabel
        bar={bar}
        script={script}
        service={service}
        dir={dir}
        labelId="related-topics"
        mobileDivider={mobileDivider}
        backgroundColor={GREY_2}
        css={styles.sectionLabel}
      >
        {heading}
      </SectionLabel>
      <TopicTags>{topicTagItems}</TopicTags>
    </aside>
  );
};

export default RelatedTopics;
