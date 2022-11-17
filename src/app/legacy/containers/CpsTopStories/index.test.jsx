import React from 'react';
import { render, screen } from '@testing-library/react';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import topStories from '#pages/StoryPage/topStories.json';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import TopStories from '.';

// eslint-disable-next-line react/prop-types
const renderTopStories = ({
  content = topStories,
  bbcOrigin = 'https://www.test.bbc.co.uk',
} = {}) => {
  return render(
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        isAmp={false}
        pageType={STORY_PAGE}
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: {
              enabled: true,
            },
          }}
        >
          <TopStories content={content} />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

const renderTopStoriesNull = ({
  bbcOrigin = 'https://www.test.bbc.co.uk',
} = {}) => {
  return render(
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        isAmp={false}
        pageType={STORY_PAGE}
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: {
              enabled: true,
            },
          }}
        >
          <TopStories content={[]} />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

const renderTopStoriesNoTitle = ({
  content = topStories,
  bbcOrigin = 'https://www.test.bbc.co.uk',
} = {}) => {
  return render(
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        isAmp={false}
        pageType={STORY_PAGE}
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: {
              enabled: true,
            },
          }}
        >
          <TopStories content={content} />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

describe('CpsRelatedContent', () => {
  it('should render Top Stories components when given appropriate data', () => {
    // Ensure fixture still has top stories
    expect(topStories.length).toBe(2);

    const { asFragment } = renderTopStories();

    expect(document.querySelectorAll(`li[class*='StoryPromoLi']`).length).toBe(
      topStories.length,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Top Stories components when without <ul>', () => {
    const [topStory] = topStories;
    const topStoriesOneItem = [topStory];

    // Ensure fixture still has top stories
    expect(topStoriesOneItem.length).toBe(1);

    const { asFragment } = renderTopStories({ content: topStoriesOneItem });

    expect(document.querySelectorAll(`li[class*='StoryPromoLi']`).length).toBe(
      0,
    );

    expect(document.querySelectorAll(`ul`).length).toBe(0);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should have a section with a "region" role (a11y) and [aria-labelledby="top-stories-heading"]', () => {
    renderTopStories();
    expect(
      document.querySelectorAll(
        `section[role='region'][aria-labelledby="top-stories-heading"]`,
      ).length,
    ).toBe(1);
  });

  it('should have an [id] #top-stories-heading', () => {
    renderTopStories();
    expect(document.querySelector(`#top-stories-heading`)).toBeTruthy();
  });

  it('should not render images for Top Stories components', () => {
    renderTopStories();
    expect(document.querySelector('img')).not.toBeInTheDocument();
  });

  it('should not render Top Stories components if no data is passed', () => {
    renderTopStoriesNull();
    expect(document.querySelectorAll(`li[class*='StoryPromoLi']`).length).toBe(
      0,
    );
  });
  it('should render a default title if translations are not available', () => {
    renderTopStoriesNoTitle();
    expect(screen.getByText(`Top Stories`)).toBeTruthy();
  });
});
