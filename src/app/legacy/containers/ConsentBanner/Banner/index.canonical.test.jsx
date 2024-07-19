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
  it('should not focus on banner when hash of url is a shared post', () => {
    window.location =
      'http://foo.com/pidgin/live/c7p765ynk9qt#asset:5e696125-cfab-4f6a-b375-67a5878935cb';

    window.location.hash = 'asset:5e696125-cfab-4f6a-b375-67a5878935cb';

    const { getByText } = render(
      <Banner type="cookie" onAccept={() => {}} onReject={() => {}} />,
      {
        service: 'news',
      },
    );

    const heading = getByText('Let us know you agree to cookies');
    expect(document.activeElement).not.toBe(heading);
  });
});
