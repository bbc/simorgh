import React from 'react';
import ConsentBannerContainer from '.';
import { PlatformContextProvider } from '../../contexts/PlatformContext';
import { isNull, shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

const component = platform => (
  <PlatformContextProvider platform={platform}>
    <ConsentBannerContainer />
  </PlatformContextProvider>
);

describe('Consent Banner', () => {
  describe('AMP', () => {
    shouldMatchSnapshot(
      'should render a ConsentBannerContainer',
      component('amp'),
    );
  });

  describe('Canonical', () => {
    isNull('should render null', component('canonical'));
  });
});
