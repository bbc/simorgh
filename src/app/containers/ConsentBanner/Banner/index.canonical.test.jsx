import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Banner from './index.canonical';

describe('Canonical Consent Banner Container - Banner', () => {
  shouldMatchSnapshot(
    'should correctly render privacy banner',
    <ServiceContextProvider service="news">
      <Banner type="privacy" onAccept={() => {}} onReject={() => {}} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render cookie banner',
    <ServiceContextProvider service="news">
      <Banner type="cookie" onAccept={() => {}} onReject={() => {}} />
    </ServiceContextProvider>,
  );
});
