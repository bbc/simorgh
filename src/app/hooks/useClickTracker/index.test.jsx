/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import useClickTracker from '.';
import pidginData from './fixtureData/tori-51745682.json';
import {
  RequestContext,
  RequestContextProvider,
} from '#contexts/RequestContext';
import {
  ServiceContext,
  ServiceContextProvider,
} from '#contexts/ServiceContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import * as params from '#containers/ATIAnalytics/params';

params.buildATIClickParams = jest.fn();

jest.useFakeTimers();
delete window.location;
window.location = { href: 'http://bbc.com/pidgin/tori-51745682' };
process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

const defaultProps = {
  pageData: pidginData,
  componentName: 'brand',
};

const WithContexts = ({ children }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    pageType={STORY_PAGE}
    isAmp={false}
    service="pidgin"
    pathname="/pidgin/tori-51745682"
  >
    <ServiceContextProvider service="pidgin">{children}</ServiceContextProvider>
  </RequestContextProvider>
);

const TestComponent = React.forwardRef((_, ref) => {
  return (
    <div ref={ref} id="test-component">
      <a href="https://www.test.bbc.com">Testing Link</a>
    </div>
  );
});

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => <WithContexts>{children}</WithContexts>;

describe('Expected use', () => {
  it('should call buildATIClickParams with page data, requestContext, serviceContext', () => {
    renderHook(() => useClickTracker(defaultProps), {
      wrapper,
    });

    const requestContext = renderHook(() => useContext(RequestContext), {
      wrapper,
    });

    const serviceContext = renderHook(() => useContext(ServiceContext), {
      wrapper,
    });

    expect(params.buildATIClickParams).toHaveBeenCalledWith(
      defaultProps.pageData,
      requestContext.result.current,
      serviceContext.result.current,
    );
  });

  it('should return a ref', () => {
    const { result } = renderHook(() => useClickTracker(defaultProps), {
      wrapper,
    });

    const { container } = render(
      <WithContexts>
        <TestComponent ref={result.current} />
      </WithContexts>,
    );

    expect(result.current.current).toBe(
      container.querySelector('#test-component'),
    );
  });
});
