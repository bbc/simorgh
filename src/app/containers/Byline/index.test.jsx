import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import BylineContainer from './index';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { service as pidginServiceConfig } from '#lib/config/services/pidgin';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

/* eslint-disable react/prop-types */
const BylineContainerWithContext = ({
  pageType,
  service,
  serviceContext = pidginServiceConfig.default,
  bbcOrigin = 'https://www.test.bbc.com',
  blocks,
}) => {
  return (
    <ServiceContext.Provider value={serviceContext}>
      <RequestContextProvider
        isAmp={false}
        pageType={pageType}
        service={service}
        statusCode={200}
        bbcOrigin={bbcOrigin}
        pathname="/pathname"
      >
        <BylineContainer blocks={blocks} />
      </RequestContextProvider>
    </ServiceContext.Provider>
  );
};

describe('Byline', () => {
  shouldMatchSnapshot(
    'should render correctly for STY pages with name and title',
    BylineContainerWithContext({
      pageType: STORY_PAGE,
      service: 'pidgin',
      blocks: [{ name: 'John Smith', title: 'Art Editor' }],
    }),
  );

  it('should render nothing if blocks is null', () => {
    render(
      BylineContainerWithContext({
        pageType: STORY_PAGE,
        service: 'pidgin',
        blocks: null,
      }),
    );

    expect(document.querySelector(`div ul li`)).toBeNull();
  });
});
