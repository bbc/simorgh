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
  service: 'afrique',
  statusCode: 200,
  pageType: 'FIX',
  pathname: '/pathname',
};

const FeatureIndexMainWithContext = props => (
  <RequestContextProvider {...requestContextData}>
    <ServiceContextProvider service="afrique">
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

    it('should render title as h1', () => {
      const { container } = render(
        <FeatureIndexMainWithContext featureIndexData={processedAfrique} />,
      );
      const h1 = container.querySelector('h1');
      const content = h1.getAttribute('id');
      const tabIndex = h1.getAttribute('tabIndex');

      expect(content).toEqual('content');
      expect(tabIndex).toBe('-1');
      expect(h1.textContent).toEqual('Tout savoir sur la CAN 2019');
    });

    it('should render feature index sections', () => {
      const { container } = render(
        <FeatureIndexMainWithContext featureIndexData={processedAfrique} />,
      );
      const sections = container.querySelectorAll('section');

      expect(sections).toHaveLength(10);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });
});
