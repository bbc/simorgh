import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
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
  it('should return the helmet wrapper with the script snippet', () => {
    const tree = renderer
      .create(
        <CanonicalChartbeatAnalytics
          chartbeatConfig={config}
          chartbeatSource="//chartbeat.js"
        />,
      )
      .toTree();

    expect(tree).toMatchSnapshot();
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
    wrapper.mount();
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
