import { Helmet } from 'react-helmet';
import { render } from '../../react-testing-library-with-providers';
import CanonicalChartbeatAnalytics from '.';
import setChartbeatConfig from './setChartbeatConfig';
import { CanonicalChartbeatConfig } from '../types';

describe('CanonicalChartbeatAnalytics', () => {
  afterEach(jest.clearAllMocks);

  const pageConfig: CanonicalChartbeatConfig = {
    domain: 'test-domain',
    sections: 'section1 section2',
    virtualReferrer: null,
    useCanonical: true,
    title: 'Page A',
    uid: 123,
  };

  it('should add a script tag which sets the chartbeat config on window', () => {
    render(
      <CanonicalChartbeatAnalytics
        chartbeatConfig={pageConfig}
        chartbeatSource="//chartbeat.js"
      />,
    );

    const [configScriptTag] = Helmet.peek().scriptTags;

    expect(configScriptTag.innerHTML).toEqual(
      `(${setChartbeatConfig.toString()})(${JSON.stringify(pageConfig)})`,
    );
  });

  it('should add a script tag which loads the chartbeat source', () => {
    render(
      <CanonicalChartbeatAnalytics
        chartbeatConfig={pageConfig}
        chartbeatSource="//chartbeat.js"
      />,
    );

    const [, chartbeatSourceScriptTag] = Helmet.peek().scriptTags;

    expect(chartbeatSourceScriptTag).toMatchObject({
      defer: true,
      src: '//chartbeat.js',
      type: 'text/javascript',
    });
  });
});
