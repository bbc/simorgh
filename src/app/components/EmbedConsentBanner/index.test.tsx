import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '../react-testing-library-with-providers';
import { ARTICLE_PAGE, STORY_PAGE } from '../../routes/utils/pageTypes';

import { EmbedConsentBannerCanonical } from '.';

describe('Embed Consent Banner', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <EmbedConsentBannerCanonical
        pageType={ARTICLE_PAGE}
        provider="youtube"
      />,
      { service: 'mundo' },
    );

    expect(container).toMatchSnapshot();
  });

  it('should render the banner when the user has not consented', () => {
    render(
      <EmbedConsentBannerCanonical
        pageType={ARTICLE_PAGE}
        provider="youtube"
      />,
      { service: 'mundo' },
    );

    expect(screen.getByTestId('consentBanner')).toBeInTheDocument();
  });

  it('should not render the banner when the user has consented', () => {
    render(
      <EmbedConsentBannerCanonical pageType={ARTICLE_PAGE} provider="youtube">
        <div>Mock iframe content</div>
      </EmbedConsentBannerCanonical>,
      { service: 'mundo' },
    );

    const button = screen.getByTestId('banner-button');

    fireEvent.click(button);

    expect(screen.queryByTestId('consentBanner')).not.toBeInTheDocument();
  });

  it('should not render the banner when the pageType is not an Article page', () => {
    render(
      <EmbedConsentBannerCanonical pageType={STORY_PAGE} provider="youtube">
        <div>Mock iframe content</div>
      </EmbedConsentBannerCanonical>,
      { service: 'mundo' },
    );

    expect(screen.queryByTestId('consentBanner')).not.toBeInTheDocument();
  });

  it('should not render the banner when the provider is not YouTube', () => {
    render(
      <EmbedConsentBannerCanonical pageType={ARTICLE_PAGE} provider="instagram">
        <div>Mock iframe content</div>
      </EmbedConsentBannerCanonical>,
      { service: 'mundo' },
    );

    expect(screen.queryByTestId('consentBanner')).not.toBeInTheDocument();
  });
});
