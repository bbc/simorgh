import React from 'react';
import { mount, shallow } from 'enzyme';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
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

  it('should not re-render helment wrapper when config changes to Page B', () => {
    const wrapper = shallow(
      <CanonicalChartbeatAnalytics
        chartbeatConfig={pageAConfig}
        chartbeatSource="//chartbeat.js"
      />,
    );

    wrapper.setProps(pageBConfig);

    expect(wrapper.find('script').first().text()).toMatch(/"title":"Page A"/);
  });

  it('should call the global virtualPage function when props change', () => {
    const wrapper = mount(
      <CanonicalChartbeatAnalytics
        chartbeatConfig={pageAConfig}
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
        chartbeatConfig={pageAConfig}
        chartbeatSource="//chartbeat.js"
      />,
    );

    // inline link to Page B
    wrapper.setProps(pageBConfig);

    // inline link to Page C
    wrapper.setProps(pageCConfig);

    // press back, return to Page B
    wrapper.setProps(pageBConfig);

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
