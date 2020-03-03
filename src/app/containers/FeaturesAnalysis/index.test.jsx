import React from 'react';
import { render } from '@testing-library/react';
import path from 'ramda/src/path';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';

import FeaturesAnalysis from '.';
import features from '#pages/StoryPage/featuresAnalysis.json';

import getInitialData from '#app/routes/cpsAsset/getInitialData';

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
        pageType="MAP"
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

  it('should render Story Feature components in Live environment', () => {
    const { asFragment } = renderFeaturesAnalysis({
      bbcOrigin: 'https://www.bbc.co.uk',
    });

    // x_candy_override should not be used in the live environment
    expect(document.querySelector(`[href*='x_candy_override']`)).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should have a "region" role (a11y)', () => {
    renderFeaturesAnalysis();
    expect(document.querySelectorAll(`[role='region']`).length).toBe(1);
  });
});
