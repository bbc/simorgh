/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, act } from '@testing-library/react';
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
import * as beacon from '#containers/ATIAnalytics/beacon';

beforeEach(() => {
  jest.clearAllMocks();
});

const urlToObject = url => {
  const { origin, pathname, searchParams } = new URL(url);

  return {
    origin,
    pathname,
    searchParams: Object.fromEntries(searchParams),
  };
};

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

const TestComponentContainer = () => {
  const clickRef = useClickTracker(defaultProps);
  return (
    <div>
      <TestComponent ref={clickRef} />
    </div>
  );
};

const TestComponent = React.forwardRef((_, ref) => {
  return (
    <div id="test-component" ref={ref}>
      <a href="https://www.test.bbc.com">Testing Link</a>
      <button type="button" id="test-button">
        Testing Button
      </button>
    </div>
  );
});

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => <WithContexts>{children}</WithContexts>;

describe('Click tracking', () => {
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

  it('should call buildATIClickParams with page data, requestContext, serviceContext', () => {
    params.buildATIClickParams = jest.fn();

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

  it('should call sendEventBeacon on click', async () => {
    const spyBeacon = jest.spyOn(beacon, 'sendEventBeacon');

    const { container } = render(
      <WithContexts>
        <TestComponentContainer />
      </WithContexts>,
    );

    act(() => container.querySelector('#test-component').click());
    act(() => container.querySelector('#test-component').click());

    expect(spyBeacon).toHaveBeenCalledTimes(1); // Should not track more than 1 click on same component
    expect(spyBeacon).toHaveBeenCalledWith({
      componentInfo: {
        actionLabel: 'brand-click',
        positioning: { child: 'DIV', parent: 'container-brand' },
        result: 'http://bbc.com/pidgin/tori-51745682',
        source: '',
      },
      componentName: 'brand',
      service: 'pidgin',
      type: 'click',
      variant: '',
    });
    jest.restoreAllMocks();
  });

  it('should send tracking request on click of child element (button)', async () => {
    global.fetch = jest.fn();

    const { container } = render(
      <WithContexts>
        <TestComponentContainer />
      </WithContexts>,
    );

    act(() => container.querySelector('#test-button').click());

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc:
          'PUB-[pidgin-brand]-[brand-click~click]-[]-[PAR=container-brand~CHD=BUTTON]-[undefined]-[]-[]-[http://bbc.com/pidgin/tori-51745682]',
        hl: expect.stringMatching(/^.+?x.+?x.+?$/),
        idclient: expect.stringMatching(/^.+?-.+?-.+?-.+?$/),
        lng: 'en-US',
        r: '0x0x24x24',
        re: '1024x768',
        s: '598285',
        s2: '70',
        type: 'AT',
      },
    });
  });
});
