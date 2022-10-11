import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '../react-testing-library-with-providers';

import { EmbedConsentBannerCanonical, EmbedConsentBannerAmp } from '.';

describe('Embed Consent Banner', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <EmbedConsentBannerCanonical provider="youtube" />,
      { service: 'mundo' },
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for TikTok embed', () => {
    const { container } = render(
      <EmbedConsentBannerCanonical provider="tiktok" />,
      { service: 'mundo' },
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot - AMP', () => {
    const { container } = render(<EmbedConsentBannerAmp provider="youtube" />, {
      service: 'mundo',
    });

    expect(container).toMatchSnapshot();
  });

  it('should render the banner when the user has not consented', () => {
    render(<EmbedConsentBannerCanonical provider="youtube" />, {
      service: 'mundo',
    });

    expect(screen.getByTestId('consentBanner')).toBeInTheDocument();
  });

  it('should render the banner on AMP with a unique ID', () => {
    render(<EmbedConsentBannerAmp provider="youtube" id="myId" />, {
      service: 'mundo',
    });

    expect(screen.getByTestId('consentBanner')).toHaveAttribute(
      'id',
      'consentBanner-myId',
    );
  });

  it('should not render the banner when the user has consented', () => {
    render(
      <EmbedConsentBannerCanonical provider="youtube">
        <div>Mock iframe content</div>
      </EmbedConsentBannerCanonical>,
      { service: 'mundo' },
    );

    const button = screen.getByTestId('banner-button');

    fireEvent.click(button);

    expect(screen.queryByTestId('consentBanner')).not.toBeInTheDocument();
  });
});
