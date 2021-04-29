/* eslint-disable react/prop-types */
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import useClickTracker from '.';
import pidginData from './fixtureData/tori-51745682.json';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

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
