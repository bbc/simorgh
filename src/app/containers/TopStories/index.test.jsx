import React from 'react';
import { render } from '@testing-library/react';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';

import TopStories from '.';
import topStories from '#pages/StoryPage/topStories.json';

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
        pageType="STY"
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <TopStories content={content} />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

describe('CpsRelatedContent', () => {
  it('should render Top Stories components when given appropriate data', () => {
    // Ensure fixture still has top stories
    expect(topStories.length).toBe(2);

    const { asFragment } = renderTopStories();

    expect(document.querySelectorAll(`li[class^='StoryPromoLi']`).length).toBe(
      topStories.length,
    );

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
});
