import { useState } from 'react';
import { css, Theme } from '@emotion/react';
import { Summary } from '#app/models/types/curationData';
import CurationGrid from '../Curation/CurationGrid';

const tabStyles = {
  container: css({
    display: 'flex',
    borderBottom: '1px solid #ccc',
    marginBottom: '1rem',
    gap: '0.25rem',
  }),
  wrapper: css({
    backgroundColor: '#fff',
    padding: '1rem 0',
    marginLeft: '1rem',
    marginRight: '1rem',
  }),
  tab: (theme: Theme) =>
    css({
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      border: '1px solid #ccc',
      borderBottom: 'none',
      background: '#fff',
      fontWeight: 600,
      color: '#222',
      outline: 'none',
      borderTopLeftRadius: '6px',
      borderTopRightRadius: '6px',
      marginBottom: '-1px',
      zIndex: 1,
      position: 'relative',
      ':focus': {
        borderColor: theme.palette.POSTBOX,
      },
    }),
  activeTab: (theme: Theme) =>
    css({
      borderBottom: `4px solid ${theme.palette.POSTBOX}`,
      color: theme.palette.POSTBOX,
      fontWeight: 700,
      zIndex: 2,
    }),
};

interface TopicCuration {
  title: string;
  summaries: Summary[];
  link?: string;
}

interface TabbedTopicsProps {
  topics: TopicCuration[];
  css?: import('@emotion/react').Interpolation<import('@emotion/react').Theme>;
}

const TabbedTopics = ({ topics, css: customCss }: TabbedTopicsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!topics || topics.length === 0) return null;

  return (
    <section
      role="region"
      aria-labelledby={`topic-tab-${activeIndex}`}
      css={css({ backgroundColor: '#fff' })}
    >
      <div css={tabStyles.wrapper}>
        <div css={tabStyles.container}>
          {topics.map((topic, idx) => (
            <button
              key={topic.title}
              css={theme => [
                tabStyles.tab(theme),
                idx === activeIndex && tabStyles.activeTab(theme),
              ]}
              id={`topic-tab-${idx}`}
              aria-controls={`topic-panel-${idx}`}
              tabIndex={idx === activeIndex ? 0 : -1}
              type="button"
              onClick={() => setActiveIndex(idx)}
            >
              {topic.title}
            </button>
          ))}
        </div>
        <div
          id={`topic-panel-${activeIndex}`}
          role="tabpanel"
          aria-labelledby={`topic-tab-${activeIndex}`}
        >
          <CurationGrid
            summaries={topics[activeIndex].summaries}
            headingLevel={2}
            isFirstCuration
            eventTrackingData={{
              componentName: 'tabbed-topics',
              groupTracker: { name: topics[activeIndex].title },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TabbedTopics;
