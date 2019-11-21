import React from 'react';
import { mount } from 'enzyme';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import CanonicalChartbeatAnalytics from '.';

describe('CanonicalChartbeatAnalytics', () => {
  global.pSUPERFLY = {
    virtualPage: jest.fn(),
  };

  afterEach(jest.clearAllMocks);

  const config = {
    domain: 'test-domain',
    type: 'article',
    sections: 'section1 section2',
    chartbeatUID: 1111,
    virtualReferrer: null,
    useCanonical: true,
    title: 'Page A',
    uid: 123,
  };

  shouldMatchSnapshot(
    'should return the helmet wrapper with the script snippet',
    <CanonicalChartbeatAnalytics
      chartbeatConfig={config}
      chartbeatSource="//chartbeat.js"
    />,
  );

  it('should call the global virtualPage function when props change', () => {
    const wrapper = mount(
      <CanonicalChartbeatAnalytics
        chartbeatConfig={config}
        chartbeatSource="//chartbeat.js"
      />,
    );

    wrapper.setProps({
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
    });
    wrapper.unmount();
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

  it('should report correct virtual referrer when user navigates back from onward journey', () => {
    // initial PWA load (Page A)
    const wrapper = mount(
      <CanonicalChartbeatAnalytics
        chartbeatConfig={config}
        chartbeatSource="//chartbeat.js"
      />,
    );

    // inline link to Page B
    wrapper.setProps({
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
    });

    // inline link to Page C
    wrapper.setProps({
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
    });

    // press back, return to Page B
    wrapper.setProps({
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
    });

    const [
      [firstCall],
      [secondCall],
      [thirdCall],
    ] = global.pSUPERFLY.virtualPage.mock.calls;

    expect(firstCall.virtualReferrer).toEqual('/page-A');
    expect(secondCall.virtualReferrer).toEqual('/page-B');
    expect(thirdCall.virtualReferrer).toEqual('/page-A');
  });
});
