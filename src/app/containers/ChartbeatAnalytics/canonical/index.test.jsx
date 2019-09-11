import React from 'react';
import { mount } from 'enzyme';
import renderHelmet from '../../../../testHelpers/renderHelmet';
import CanonicalChartbeatAnalytics from '.';

describe('CanonicalChartbeatAnalytics', () => {
  global.pSUPERFLY = {
    virtualPage: jest.fn(),
  };

  const config = {
    domain: 'test-domain',
    type: 'article',
    sections: 'section1 section2',
    chartbeatUID: 1111,
    virtualReferrer: null,
    useCanonical: true,
    title: 'This is an article',
    uid: 123,
  };

  it('should return the helmet wrapper with the script snippet', async () => {
    const html = await renderHelmet(
      <CanonicalChartbeatAnalytics
        chartbeatConfig={config}
        chartbeatSource="//chartbeat.js"
      />,
    );

    expect(html).toMatchSnapshot();
  });

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
        virtualReferrer: '/some-path',
        title: 'This is another article',
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
      virtualReferrer: '/some-path',
      title: 'This is another article',
      uid: 123,
    });
  });
});
