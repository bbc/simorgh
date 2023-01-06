import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import CanonicalChartbeatAnalytics from '.';

describe('CanonicalChartbeatAnalytics', () => {
  global.pSUPERFLY = {
    virtualPage: jest.fn(),
  };

  afterEach(jest.clearAllMocks);

  const pageAConfig = {
    domain: 'test-domain',
    type: 'article',
    sections: 'section1 section2',
    chartbeatUID: 1111,
    virtualReferrer: null,
    useCanonical: true,
    title: 'Page A',
    uid: 123,
  };

  const pageBConfig = {
    chartbeatConfig: {
      domain: 'test-domain',
      type: 'article',
      sections: 'section1 section2',
      chartbeatUID: 1111,
      useCanonical: true,
      virtualReferrer: '/page-A',
      title: 'Page B',
      uid: 123,
    },
  };

  const pageCConfig = {
    chartbeatConfig: {
      domain: 'test-domain',
      type: 'article',
      sections: 'section1 section2',
      chartbeatUID: 1111,
      useCanonical: true,
      virtualReferrer: '/page-B',
      title: 'Page C',
      uid: 123,
    },
  };

  shouldMatchSnapshot(
    'should return the helmet wrapper with the script snippet',
    <CanonicalChartbeatAnalytics
      chartbeatConfig={pageAConfig}
      chartbeatSource="//chartbeat.js"
    />,
  );

  it('should not re-render helment wrapper when config changes to Page B', async () => {
    const { rerender } = render(
      <CanonicalChartbeatAnalytics
        chartbeatConfig={pageAConfig}
        chartbeatSource="//chartbeat.js"
      />,
    );

    await act(async () => {
      await rerender(
        <CanonicalChartbeatAnalytics
          chartbeatConfig={pageBConfig.chartbeatConfig}
          chartbeatSource="//chartbeat.js"
        />,
      );
    });

    await waitFor(() => {
      expect(document.querySelectorAll('script')[0].textContent).toMatch(
        /"title":"Page A"/,
      );
    });
  });

  it('should call the global virtualPage function when props change', async () => {
    const { rerender } = render(
      <CanonicalChartbeatAnalytics
        chartbeatConfig={pageAConfig}
        chartbeatSource="//chartbeat.js"
      />,
    );

    await act(async () => {
      await rerender(
        <CanonicalChartbeatAnalytics
          chartbeatConfig={{
            domain: 'test-domain',
            type: 'article',
            sections: 'section1 section2',
            chartbeatUID: 1111,
            useCanonical: true,
            virtualReferrer: '/page-A',
            title: 'Page B',
            uid: 123,
          }}
          chartbeatSource="//chartbeat.js"
        />,
      );
    });

    await act(async () => {
      // unmount
      await rerender(<div />);
    });

    expect(global.pSUPERFLY.virtualPage).toHaveBeenCalled();
    expect(global.pSUPERFLY.virtualPage).toHaveBeenCalledWith({
      domain: 'test-domain',
      type: 'article',
      sections: 'section1 section2',
      chartbeatUID: 1111,
      useCanonical: true,
      virtualReferrer: '/page-A',
      title: 'Page B',
      uid: 123,
    });
  });

  it('should report correct virtual referrer when user navigates back from onward journey', async () => {
    // initial PWA load (Page A)
    const { rerender } = render(
      <CanonicalChartbeatAnalytics
        chartbeatConfig={pageAConfig}
        chartbeatSource="//chartbeat.js"
      />,
    );

    // inline link to Page B
    await act(async () => {
      await rerender(
        <CanonicalChartbeatAnalytics
          chartbeatConfig={pageBConfig.chartbeatConfig}
          chartbeatSource="//chartbeat.js"
        />,
      );
    });

    // inline link to Page C
    await act(async () => {
      await rerender(
        <CanonicalChartbeatAnalytics
          chartbeatConfig={pageCConfig.chartbeatConfig}
          chartbeatSource="//chartbeat.js"
        />,
      );
    });

    // press back, return to Page B
    await act(async () => {
      await rerender(
        <CanonicalChartbeatAnalytics
          chartbeatConfig={pageBConfig.chartbeatConfig}
          chartbeatSource="//chartbeat.js"
        />,
      );
    });

    const [[firstCall], [secondCall], [thirdCall]] =
      global.pSUPERFLY.virtualPage.mock.calls;

    expect(firstCall.virtualReferrer).toEqual('/page-A');
    expect(secondCall.virtualReferrer).toEqual('/page-B');
    expect(thirdCall.virtualReferrer).toEqual('/page-A');
  });
});
