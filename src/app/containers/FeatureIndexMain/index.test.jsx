import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import FeatureIndexMain from '.';
import featureIndexDataAfrique from '#data/afrique/cpsAssets/48465371';
import preprocessor from '#lib/utilities/preprocessor';
import addIdsToItems from '#lib/utilities/preprocessor/rules/addIdsToItems';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const processedAfrique = preprocessor(featureIndexDataAfrique, [addIdsToItems]);

jest.mock('uuid', () =>
  (() => {
    let x = 1;
    return () => {
      x += 1;
      return `mockid-${x}`;
    };
  })(),
);

jest.mock('../ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const requestContextData = {
  isAmp: false,
  service: 'igbo',
  statusCode: 200,
  pageType: 'frontPage',
  pathname: '/pathname',
};

const FeatureIndexMainWithContext = props => (
  <RequestContextProvider {...requestContextData}>
    <ServiceContextProvider service="igbo">
      <FeatureIndexMain {...props} />
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('FeatureIndexMain', () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should render an afrique feature index correctly',
      <FeatureIndexMainWithContext featureIndexData={processedAfrique} />,
    );
  });

  describe('assertions', () => {
    afterEach(cleanup);

    it('should render feature index sections', () => {
      const { container } = render(
        <FeatureIndexMainWithContext featureIndexData={processedAfrique} />,
      );
      const sections = container.querySelectorAll('section');

      expect(sections).toHaveLength(7);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });
});
