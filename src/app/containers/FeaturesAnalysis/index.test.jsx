import React from 'react';
import { render } from '@testing-library/react';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';

import FeaturesAnalysis from '.';
import features from '#pages/StoryPage/featuresAnalysis.json';

// eslint-disable-next-line react/prop-types
const renderFeaturesAnalysis = ({
  content = features,
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
        <FeaturesAnalysis content={content} enableGridWrapper />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

describe('CpsRelatedContent', () => {
  it('should render Story Feature components when given appropriate data', () => {
    // Ensure fixture still has features
    expect(features.length).toBe(2);

    const { asFragment } = renderFeaturesAnalysis();

    expect(document.querySelectorAll(`li[class^='StoryPromoLi']`).length).toBe(
      features.length,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Story Promo components without <ul> when given single item in collection', () => {
    const topFeaturesOneItem = [features[0]];

    expect(topFeaturesOneItem.filter(Boolean).length).toBe(1);

    const { asFragment } = renderFeaturesAnalysis({
      content: topFeaturesOneItem,
    });

    expect(document.querySelectorAll(`li[class^='StoryPromoLi']`).length).toBe(
      0,
    );

    expect(document.querySelectorAll(`ul`).length).toBe(0);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should have a section with a "region" role (a11y) and [aria-labelledby="features-analysis-heading"]', () => {
    renderFeaturesAnalysis();
    expect(
      document.querySelectorAll(
        `section[role='region'][aria-labelledby="features-analysis-heading"]`,
      ).length,
    ).toBe(1);
  });

  it('should have an [id] #features-analysis-heading', () => {
    renderFeaturesAnalysis();
    expect(document.querySelector(`#features-analysis-heading`)).toBeTruthy();
  });
});
