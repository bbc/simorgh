import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { STORY_PAGE } from '#routes/utils/pageTypes';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContext } from '#contexts/ServiceContext';
import { service as pidginServiceConfig } from '../../../lib/config/services/pidgin';
import BylineContainer from './index';

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
  it('should render correctly for STY pages with name and title', () => {
    const { container } = render(
      BylineContainerWithContext({
        pageType: STORY_PAGE,
        service: 'pidgin',
        blocks: [{ name: 'John Smith', title: 'Art Editor' }],
      }),
    );
    expect(container).toMatchSnapshot();
  });

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
