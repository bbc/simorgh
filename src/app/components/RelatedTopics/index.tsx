import { use } from 'react';
import SectionLabel from '#psammead/psammead-section-label/src';
import { GREY_2 } from '#app/components/ThemeProvider/palette';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import TopicTags from '#app/components/TopicTags';
import { TopicTag } from '#app/models/types/metadata';
import { ComponentExperimentProps } from '#app/models/types/global';
import styles from './index.styles';

interface RelatedTopicsProps {
  topics: Pick<TopicTag, 'topicName' | 'topicId'>[];
  mobileDivider?: boolean;
  bar?: boolean;
  className?: string;
  experimentProps?: ComponentExperimentProps;
}

const RelatedTopics = ({
  topics = [],
  mobileDivider = true,
  bar = true,
  className = '',
  experimentProps,
}: RelatedTopicsProps) => {
  const { service, translations, dir } = use(ServiceContext);
  const { variant } = use(RequestContext);

  const shouldDisplayTopics =
    topics.length > 0 && !(service === 'zhongwen' && variant === 'simp');

  if (!shouldDisplayTopics) return null;

  const heading = translations?.relatedTopics ?? 'Related Topics';

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
        dir={dir}
        labelId="related-topics"
        mobileDivider={mobileDivider}
        backgroundColor={GREY_2}
        css={styles.sectionLabel}
      >
        {heading}
      </SectionLabel>
      <TopicTags tags={topics} experimentProps={experimentProps} />
    </aside>
  );
};

export default RelatedTopics;
