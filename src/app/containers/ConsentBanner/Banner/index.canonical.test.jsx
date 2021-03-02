import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Banner from './index.canonical';
import { render } from '@testing-library/react';

describe('Canonical Consent Banner Container', () => {
  const privacy = ({ description, service }) =>
    shouldMatchSnapshot(
      description,
      <ServiceContextProvider service={service}>
        <Banner type="privacy" onAccept={() => {}} onReject={() => {}} />
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
        <Banner type="cookie" onAccept={() => {}} onReject={() => {}} />
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

  it('should focus on banner heading on mount', () => {
    const { getByText } = render(
      <ServiceContextProvider service="news">
        <Banner type="cookie" onAccept={() => {}} onReject={() => {}} />
      </ServiceContextProvider>,
    );

    const heading = getByText('Let us know you agree to cookies');
    expect(document.activeElement).toBe(heading);
  });
});
