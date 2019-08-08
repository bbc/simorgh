import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Banner from './index.amp';

describe('Amp Consent Banner Container - Banner', () => {
  shouldMatchSnapshot(
    'should correctly render privacy banner - LTR layout',
    <ServiceContextProvider service="news">
      <Banner
        type="privacy"
        acceptAction="tap:cookieId.show, privacyId.hide"
        rejectAction="tap:cookieId.show, privacyId.hide"
        promptId="promptId"
        hidden
      />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render privacy banner - RTL layout',
    <ServiceContextProvider service="arabic">
      <Banner
        type="privacy"
        acceptAction="tap:cookieId.show, privacyId.hide"
        rejectAction="tap:cookieId.show, privacyId.hide"
        promptId="promptId"
        hidden
      />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render cookie banner - LTR layout',
    <ServiceContextProvider service="news">
      <Banner
        type="cookie"
        acceptAction="tap:parentId.accept"
        rejectAction="tap:parentId.reject"
        promptId="promptId"
        hidden
      />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render cookie banner - RTL layout',
    <ServiceContextProvider service="arabic">
      <Banner
        type="cookie"
        acceptAction="tap:parentId.accept"
        rejectAction="tap:parentId.reject"
        promptId="promptId"
        hidden
      />
    </ServiceContextProvider>,
  );
});
