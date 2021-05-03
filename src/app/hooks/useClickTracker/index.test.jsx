/* eslint-disable react/prop-types */
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, act } from '@testing-library/react';
import useClickTracker from '.';
import pidginData from './fixtureData/tori-51745682.json';
import zhongwenData from './fixtureData/chinese-news-49631219-trad.json';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

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

const WithContexts = ({
  children,
  variant,
  service = 'pidgin',
  pathname = '/pidgin/tori-51745682',
}) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    pageType={STORY_PAGE}
    isAmp={false}
    pathname={pathname}
    service={service}
    variant={variant}
  >
    <ServiceContextProvider service={service}>
      {children}
    </ServiceContextProvider>
  </RequestContextProvider>
);

const TestComponentContainerContainer = () => {
  const clickRef = useClickTracker({
    pageData: pidginData,
    componentName: 'header',
  });

  return (
    <div ref={clickRef}>
      <TestComponentContainer />
    </div>
  );
};

const TestComponentContainer = ({ hookProps = defaultProps }) => {
  const clickRef = useClickTracker(hookProps);
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

  it('should send a single tracking request on click', async () => {
    const spyFetch = jest.spyOn(global, 'fetch');
    const { container } = render(
      <WithContexts>
        <TestComponentContainer />
      </WithContexts>,
    );

    expect(spyFetch).toHaveBeenCalledTimes(0);

    act(() => container.querySelector('#test-component').click());

    expect(spyFetch).toHaveBeenCalledTimes(1);

    act(() => container.querySelector('#test-component').click());

    expect(spyFetch).toHaveBeenCalledTimes(1);

    const [[viewEventUrl]] = spyFetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc:
          'PUB-[pidgin-brand]-[brand-click~click]-[]-[PAR=container-brand~CHD=DIV]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://bbc.com/pidgin/tori-51745682]',
        hl: expect.stringMatching(/^.+?x.+?x.+?$/),
        idclient: expect.stringMatching(/^.+?-.+?-.+?-.+?$/),
        lng: 'en-US',
        p: 'news::pidgin.news.story.51745682.page',
        r: '0x0x24x24',
        re: '1024x768',
        s: '598343',
        s2: '70',
        type: 'AT',
      },
    });
  });

  it('should send tracking request on click of child element (button)', async () => {
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
          'PUB-[pidgin-brand]-[brand-click~click]-[]-[PAR=container-brand~CHD=BUTTON]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://bbc.com/pidgin/tori-51745682]',
        hl: expect.stringMatching(/^.+?x.+?x.+?$/),
        idclient: expect.stringMatching(/^.+?-.+?-.+?-.+?$/),
        lng: 'en-US',
        p: 'news::pidgin.news.story.51745682.page',
        r: '0x0x24x24',
        re: '1024x768',
        s: '598343',
        s2: '70',
        type: 'AT',
      },
    });

    jest.restoreAllMocks();
  });

  it('should only track clicks on the child component if clicks are tracked on both a parent and child', async () => {
    const { container } = render(
      <WithContexts>
        <TestComponentContainerContainer />
      </WithContexts>,
    );

    act(() => container.querySelector('#test-button').click());

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc:
          'PUB-[pidgin-brand]-[brand-click~click]-[]-[PAR=container-brand~CHD=BUTTON]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://bbc.com/pidgin/tori-51745682]',
        hl: expect.stringMatching(/^.+?x.+?x.+?$/),
        idclient: expect.stringMatching(/^.+?-.+?-.+?-.+?$/),
        lng: 'en-US',
        p: 'news::pidgin.news.story.51745682.page',
        r: '0x0x24x24',
        re: '1024x768',
        s: '598343',
        s2: '70',
        type: 'AT',
      },
    });

    jest.restoreAllMocks();
  });

  it('should include the variant in the request params when necessary', () => {
    window.location = { href: 'http://bbc.com/zhongwen/chinese-news-49631219' };

    const hookProps = {
      pageData: zhongwenData,
      componentName: 'ad',
    };

    const { container } = render(
      <WithContexts
        service="zhongwen"
        pathname="/zhongwen/chinese-news-49631219"
        variant="trad"
      >
        <TestComponentContainer hookProps={hookProps} />
      </WithContexts>,
    );

    act(() => container.querySelector('#test-component').click());

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc:
          'PUB-[zhongwen-ad]-[ad-click~click]-[trad]-[PAR=container-ad~CHD=DIV]-[chinese_news::zhongwentrad.chinese_news.media_asset.49631219.page]-[]-[]-[http://bbc.com/zhongwen/chinese-news-49631219]',
        hl: expect.stringMatching(/^.+?x.+?x.+?$/),
        idclient: expect.stringMatching(/^.+?-.+?-.+?-.+?$/),
        lng: 'en-US',
        p: 'chinese_news::zhongwentrad.chinese_news.media_asset.49631219.page',
        r: '0x0x24x24',
        re: '1024x768',
        s: '598343',
        type: 'AT',
      },
    });
  });
});
