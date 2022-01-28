import React from 'react';
import { node, string, bool } from 'prop-types';
import { render, waitFor } from '@testing-library/react';
import { OptimizelyProvider } from '@optimizely/react-sdk';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import OptimizelyPageViewTracking from '.';

const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
};

const ContextWrap = ({ pageType, isAmp, children, service }) => (
  <RequestContextProvider
    isAmp={isAmp}
    pageType={pageType}
    service={service}
    pathname="/pathname"
  >
    <OptimizelyProvider optimizely={optimizely} isServerSide>
      {children}
    </OptimizelyProvider>
  </RequestContextProvider>
);

ContextWrap.propTypes = {
  children: node.isRequired,
  pageType: string.isRequired,
  isAmp: bool.isRequired,
  service: string.isRequired,
};

describe('Optimizely Page View tracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call Optimizely track function for Article Page on page render', async () => {
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
        <OptimizelyPageViewTracking />
      </ContextWrap>,
    );

    await waitFor(() => {
      expect(optimizely.track).toHaveBeenCalledTimes(1);
    });
  });

  it('should not call Optimizely track function for Article Page on AMP', () => {
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp>
        <OptimizelyPageViewTracking />
      </ContextWrap>,
    );

    expect(optimizely.track).toHaveBeenCalledTimes(0);
  });
});
