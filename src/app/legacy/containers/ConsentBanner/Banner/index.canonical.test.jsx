import React from 'react';
import { render } from '../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import Banner from './index.canonical';

describe('Canonical Consent Banner Container', () => {
  const privacy = ({ description, service }) =>
    it('Canonical Consent Banner Container', () => {
      const { container } = render(
      description,
      <ServiceContextProvider service={service}>
        <Banner type="privacy" onAccept={() => {}} onReject={() => {}} />
      </ServiceContextProvider>,
    );
      expect(container).toMatchSnapshot();
  });

  privacy({
    description: 'should correctly render privacy banner - LTR layout',
    service: 'news',
  });

  privacy({
    description: 'should correctly render privacy banner - RTL layout',
    service: 'arabic',
  });

  const cookie = ({ description, service }) =>
    it('cookie', () => {
      const { container } = render(
      description,
      <ServiceContextProvider service={service}>
        <Banner type="cookie" onAccept={() => {}} onReject={() => {}} />
      </ServiceContextProvider>,
    );
      expect(container).toMatchSnapshot();
  });

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
