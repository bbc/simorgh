import React from 'react';
import { render } from 'react-testing-library';
import ConsentBannerContainer from '.';
import { PlatformContextProvider } from '../../contexts/PlatformContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import { isNull, shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

const component = (platform, serviceContextStub) => (
  <ServiceContext.Provider value={serviceContextStub}>
    <PlatformContextProvider platform={platform}>
      <ConsentBannerContainer />
    </PlatformContextProvider>
  </ServiceContext.Provider>
);

const newsServiceContextStub = {
  translations: {
    consentBanner: {
      title: 'Let us know you agree to cookies',
      description:
        'We use cookies to give you the best online experience. Please let us know if you agree to all of these cookies.',
      accept: 'Accept',
      reject: 'Reject',
    },
  },
};

const persianServiceContextStub = {
  translations: {
    consentBanner: {
      title: 'عنوان تست',
      description: 'توصیف تست',
      accept: 'تایید کنید',
      reject: 'رد کنید',
    },
  },
};

const expectNodeToContainInlinedJSON = node =>
  expect(
    node.querySelectorAll('script[type="application/json"]').length,
  ).toEqual(1);

describe('Consent Banner', () => {
  describe('AMP', () => {
    shouldMatchSnapshot(
      'should render a News ConsentBannerContainer',
      component('amp', newsServiceContextStub),
    );
    shouldMatchSnapshot(
      'should render a Persian ConsentBannerContainer',
      component('amp', persianServiceContextStub),
    );
    it('should render amp-geo element containing inlined JSON', () => {
      const { container } = render(component('amp', newsServiceContextStub));
      expect(container.querySelectorAll('amp-geo').length).toEqual(1);
      const ampGeo = container.querySelector('amp-geo');
      expectNodeToContainInlinedJSON(ampGeo);
    });
    it('should render amp-consent element containing inlined JSON', () => {
      const { container } = render(component('amp', newsServiceContextStub));
      expect(container.querySelectorAll('amp-consent').length).toEqual(1);
      const ampConsent = container.querySelector('amp-consent');
      expectNodeToContainInlinedJSON(ampConsent);
    });
  });

  describe('Canonical', () => {
    isNull(
      'should render null',
      component('canonical', newsServiceContextStub),
    );
  });
});
