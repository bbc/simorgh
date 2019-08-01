import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import CanonicalChartbeatAnalytics from '.';

describe('CanonicalChartbeatAnalytics', () => {
  global.pSUPERFLY = {
    virtualPage: jest.fn(),
  };

  const props = {
    domain: 'test-domain',
    type: 'article',
    sections: 'section1 section2',
    cookie: null,
    chartbeatUID: 1111,
    chartbeatSource: '//chartbeat.js',
    hasCookie: false,
    hasReferrer: false,
    referrer: null,
    title: 'This is an article',
  };
  it('should return the helmet wrapper with the script snippet', () => {
    const tree = renderer
      .create(<CanonicalChartbeatAnalytics {...props} />)
      .toTree();

    expect(tree).toMatchSnapshot();
  });

  it('should call the global virtualPage function when props change', () => {
    const wrapper = mount(<CanonicalChartbeatAnalytics {...props} />);

    act(() => {
      wrapper.setProps({
        cookie: 'cookie',
        hasCookie: true,
        hasReferrer: true,
        referrer: '/some-path',
        title: 'This is another article',
      });
    });
    expect(global.pSUPERFLY.virtualPage).toHaveBeenCalled();
  });
});
