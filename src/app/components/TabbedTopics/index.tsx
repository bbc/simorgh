import { useState, use, useContext } from 'react';
import { ScrollableNavigation } from '#app/legacy/psammead/psammead-navigation/src/ScrollableNavigation';
import { css, Theme } from '@emotion/react';
import { Summary } from '#app/models/types/curationData';
import SectionLabel from '#psammead/psammead-section-label/src';
import { GREY_2 } from '#app/components/ThemeProvider/palette';
import { ServiceContext } from '#app/contexts/ServiceContext';
import CurationGrid from '../Curation/CurationGrid';

const tabStyles = {
  container: css({
    display: 'flex',
    borderBottom: '1px solid #ccc',
    marginBottom: '1rem',
    gap: '0.25rem',
    minHeight: '3.5rem',
    width: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    position: 'relative',
    scrollBehavior: 'smooth',
    touchAction: 'pan-x',
    // Hide scrollbars
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    // Remove white-space: nowrap here, handled by ScrollableNavigation
  }),
  wrapper: css({
    backgroundColor: '#fff',
    padding: '1rem 0',
    marginLeft: '1rem',
    marginRight: '1rem',
  }),
  tab: (theme: Theme) =>
    css({
      padding: '0.5rem 1.5rem',
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
      flex: '0 0 auto',
      whiteSpace: 'normal',
      overflow: 'visible',
      textOverflow: 'unset',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      lineHeight: '1.2',
      height: 'auto',
      fontSize: '1rem',
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
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

const TabbedTopics = ({ topics }: TabbedTopicsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { translations, dir } = useContext(ServiceContext);
  const heading = translations?.relatedTopics ?? 'Related Topics';

  if (!topics || topics.length === 0) return null;

  return (
    <section
      role="region"
      aria-labelledby={`topic-tab-${activeIndex}`}
      css={css({ backgroundColor: '#fff' })}
    >
      <div css={tabStyles.wrapper}>
        <div css={css({ marginTop: 0 })}>
          <SectionLabel
            bar
            dir={dir}
            labelId="related-topics"
            mobileDivider={false}
            backgroundColor="#fff"
            css={css({
              marginBottom: '1rem',
              backgroundColor: '#fff',
              marginTop: 0,
            })}
          >
            {heading}
          </SectionLabel>
        </div>
        <div style={{ position: 'relative' }}>
          <ScrollableNavigation dir={dir} navPosition="bottom">
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
                  {/* Allow one line break, show full topic title */}
                  {topic.title
                    .split('\n')
                    .slice(0, 2)
                    .map((line, i) => (
                      <span
                        key={i}
                        css={css({
                          display: 'block',
                          whiteSpace: 'normal',
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#222',
                          lineHeight: '1.2',
                          overflowWrap: 'break-word',
                          wordBreak: 'break-word',
                        })}
                      >
                        {line}
                      </span>
                    ))}
                </button>
              ))}
            </div>
          </ScrollableNavigation>
          {/* Gradient overlay for scroll indication, border grey */}
          <div
            css={css({
              position: 'absolute',
              top: 0,
              right: 0,
              width: '3rem',
              height: '100%',
              pointerEvents: 'none',
              background:
                'linear-gradient(to right, rgba(204,204,204,0) 0%, #ccc 100%)',
              zIndex: 3,
            })}
          />
          {/* Red ellipsis icon above scroll edge */}
          <div
            css={css({
              position: 'absolute',
              top: '-1.5rem',
              right: '1.5rem',
              width: '1.5rem',
              height: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 4,
            })}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="5" cy="12" r="2" fill="#bb1919" />
              <circle cx="12" cy="12" r="2" fill="#bb1919" />
              <circle cx="19" cy="12" r="2" fill="#bb1919" />
            </svg>
          </div>
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
          <div
            css={css({
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
            })}
          >
            <a
              href={`${topics[activeIndex].link}`}
              css={css({
                display: 'inline-flex',
                alignItems: 'center',
                fontWeight: 700,
                color: '#222',
                textDecoration: 'none',
                fontSize: '1.15rem',
                lineHeight: 1.4,
                ':hover': { color: '#007BBC', textDecoration: 'underline' },
              })}
            >
              See all from this topic
              <svg
                viewBox="0 0 32 32"
                focusable="false"
                aria-hidden="true"
                width="16"
                height="16"
                style={{ marginLeft: 4 }}
              >
                <path
                  d="M21.6 14.3L5.5 31h6.4l14.6-15L11.9 1H5.5l16.1 16.7v-3.4z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabbedTopics;
