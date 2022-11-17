import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import Banner from './index.amp';

describe('Amp Consent Banner Container', () => {
  const privacy = ({ description, service }) =>
    shouldMatchSnapshot(
      description,
      <ServiceContextProvider service={service}>
        <Banner
          type="privacy"
          acceptAction="tap:cookieId.show, privacyId.hide"
          rejectAction="tap:cookieId.show, privacyId.hide"
          promptId="promptId"
          hidden
        />
      </ServiceContextProvider>,
    );

  privacy({
    description: 'should correctly render privacy banner - LTR layout',
    service: 'news',
  });

  privacy({
    description: 'should correctly render privacy banner - RTL layout',
    service: 'arabic',
  });

  const cookie = ({ description, service }) =>
    shouldMatchSnapshot(
      description,
      <ServiceContextProvider service={service}>
        <Banner
          type="cookie"
          acceptAction="tap:parentId.accept"
          rejectAction="tap:parentId.reject"
          promptId="promptId"
          hidden
        />
      </ServiceContextProvider>,
    );

  cookie({
    description: 'should correctly render cookie banner - LTR layout',
    service: 'news',
  });

  cookie({
    description: 'should correctly render cookie banner - RTL layout',
    service: 'arabic',
  });
});
