import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Banner from './index.canonical';

describe('Canonical Consent Banner Container - Banner', () => {
  shouldMatchSnapshot(
    'should correctly render privacy banner - LTR layout',
    <ServiceContextProvider service="news">
      <Banner type="privacy" onAccept={() => {}} onReject={() => {}} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render cookie banner - LTR layout',
    <ServiceContextProvider service="news">
      <Banner type="cookie" onAccept={() => {}} onReject={() => {}} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render privacy banner - RTL layout',
    <ServiceContextProvider service="arabic">
      <Banner type="privacy" onAccept={() => {}} onReject={() => {}} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render cookie banner - RTL layout',
    <ServiceContextProvider service="arabic">
      <Banner type="cookie" onAccept={() => {}} onReject={() => {}} />
    </ServiceContextProvider>,
  );
});
