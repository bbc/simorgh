import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { RequestContextProvider } from '#contexts/RequestContext';
import useData from './useData';

const withRequestContext = ssrData => ({ children }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.co.uk"
    isAmp={false}
    pageType="frontPage"
    pathname="/pathname"
    service="news"
    statusCode={200}
    ssrData={ssrData}
  >
    {children}
  </RequestContextProvider>
);

describe('useData', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  it('should return initial data if it exists in context', () => {
    const { result } = renderHook(() => useData('http://test.com/api'), {
      wrapper: withRequestContext({ 'http://test.com/api': 'testData' }),
    });
    expect(result.current).toBe('testData');
  });

  it('should fetch data from endpoint if it does not exist in context', async () => {
    fetch.mockResponse(JSON.stringify('testData'));

    let result;

    await act(async () => {
      result = renderHook(() => useData('http://test.com/api'), {
        wrapper: withRequestContext({
          'http://test.com/anotherapi': 'otherData',
        }),
      }).result;
    });

    expect(result.current).toBe('testData');
    expect(result.current).not.toBe('otherData');
  });

  it('should fetch data from endpoint if there is no SSR data in context', async () => {
    fetch.mockResponse(JSON.stringify('testData'));

    let result;

    await act(async () => {
      result = renderHook(() => useData('http://test.com/api'), {
        wrapper: withRequestContext(),
      }).result;
    });

    expect(result.current).toBe('testData');
  });

  it('gracefully handles errors', async () => {
    fetch.mockResponse('Not Found', {
      status: 404,
    });

    let result;

    await act(async () => {
      result = renderHook(() => useData('http://test.com/api'), {
        wrapper: withRequestContext(),
      }).result;
    });

    expect(result.current).toBe(null);
  });
});
