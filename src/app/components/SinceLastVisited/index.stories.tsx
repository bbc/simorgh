import { useMemo } from 'react';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import SinceLastVisited from '.';
import { getSessionKey, getStorageKey } from './constants';
import { resetVisitStateForTests } from './lastVisit';
import { buildTwoWeekSummaries, PREVIOUS_VISIT_AGE_MS } from './fixtures';

type Props = {
  storyCount: number;
  previousVisitHoursAgo: number;
};

const Component = ({ storyCount, previousVisitHoursAgo }: Props) => {
  const summaries = useMemo(
    () => buildTwoWeekSummaries().slice(0, storyCount),
    [storyCount],
  );

  // The component reads the previous visit from storage, so seed it before render
  useMemo(() => {
    sessionStorage.removeItem(getSessionKey('mundo'));
    resetVisitStateForTests();
    localStorage.setItem(
      getStorageKey('mundo'),
      String(Date.now() - previousVisitHoursAgo * 60 * 60 * 1000),
    );
  }, [previousVisitHoursAgo, storyCount]);

  return (
    <ServiceContextProvider service="mundo">
      <RequestContextProvider
        service="mundo"
        pageType="article"
        pathname="/mundo/articles/current-article"
        isAmp={false}
      >
        <div style={{ maxWidth: '62rem', padding: '1rem' }}>
          <SinceLastVisited
            key={`${storyCount}-${previousVisitHoursAgo}`}
            topStories={summaries}
          />
        </div>
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

export default {
  title: 'Components/Since Last Visited',
  Component,
  parameters: { chromatic: { disable: true } },
  args: {
    storyCount: 20,
    previousVisitHoursAgo: PREVIOUS_VISIT_AGE_MS / (60 * 60 * 1000),
  },
  argTypes: {
    storyCount: { control: { type: 'range', min: 1, max: 20, step: 1 } },
    previousVisitHoursAgo: {
      description: 'How long ago the reader last visited (max 14 days = 336)',
      control: { type: 'range', min: 1, max: 335, step: 1 },
    },
  },
};

/** 20 stories across 14 days to try the dated timeline scrollbar. */
export const TwoWeekTimeline = (args: Props) => <Component {...args} />;

/** Closer to what the BFF returns today: a handful of recent stories. */
export const RecentStoriesOnly = Object.assign(
  (args: Props) => <Component {...args} />,
  { args: { storyCount: 9, previousVisitHoursAgo: 48 } },
);
