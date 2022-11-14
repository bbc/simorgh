import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '../react-testing-library-with-providers';

import { EmbedConsentBannerCanonical, EmbedConsentBannerAmp } from '.';

import * as clickTracking from '../../hooks/useClickTrackerHandler';

describe('Embed Consent Banner', () => {
  it('should render correct elements for the banner', () => {
    render(<EmbedConsentBannerCanonical provider="youtube" />, {
      service: 'mundo',
    });

    expect(screen.getByTestId('banner-heading')).toBeInTheDocument();
    expect(screen.getByTestId('banner-body')).toBeInTheDocument();
    expect(screen.getByTestId('banner-button')).toBeInTheDocument();
  });

  it('should render correct elements for the banner - AMP', () => {
    render(<EmbedConsentBannerAmp provider="youtube" />, {
      service: 'mundo',
    });

    expect(screen.getByTestId('banner-heading')).toBeInTheDocument();
    expect(screen.getByTestId('banner-body')).toBeInTheDocument();
    expect(screen.getByTestId('banner-button')).toBeInTheDocument();
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

  describe('Event tracking - Embed Consent Banner', () => {
    afterEach(() => {
      jest.clearAllMocks();
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

    it('should call the click tracking hook when the banner button is clicked', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

      render(
        <EmbedConsentBannerCanonical provider="youtube">
          <div>Mock iframe content</div>
        </EmbedConsentBannerCanonical>,
        { service: 'mundo' },
      );

      const button = screen.getByTestId('banner-button');

      fireEvent.click(button);

      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'social-consent-banner-youtube',
      });
    });
  });
});
