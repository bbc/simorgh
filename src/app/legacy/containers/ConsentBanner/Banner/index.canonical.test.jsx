import React from 'react';
import { render } from '../../../../components/react-testing-library-with-providers';
import Banner from './index.canonical';

describe('Canonical Consent Banner Container', () => {
  it('should correctly render privacy banner - LTR layout', () => {
    const { container } = render(
      <Banner type="privacy" onAccept={() => {}} onReject={() => {}} />,
      {
        service: 'news',
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render privacy banner - RTL layout', () => {
    const { container } = render(
      <Banner type="privacy" onAccept={() => {}} onReject={() => {}} />,
      {
        service: 'arabic',
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render cookie banner - LTR layout', () => {
    const { container } = render(
      <Banner type="cookie" onAccept={() => {}} onReject={() => {}} />,
      {
        service: 'news',
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render cookie banner - RTL layout', () => {
    const { container } = render(
      <Banner type="cookie" onAccept={() => {}} onReject={() => {}} />,
      {
        service: 'arabic',
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should focus on banner heading on mount', () => {
    const { getByText } = render(
      <Banner type="cookie" onAccept={() => {}} onReject={() => {}} />,
      {
        service: 'news',
      },
    );

    const heading = getByText('Let us know you agree to cookies');
    expect(document.activeElement).toBe(heading);
  });
});
