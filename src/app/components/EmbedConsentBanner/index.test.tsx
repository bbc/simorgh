import React, { PropsWithChildren } from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ARTICLE_PAGE, STORY_PAGE } from '../../routes/utils/pageTypes';
import ThemeProvider from '../ThemeProvider';
import { Services } from '../../models/types/global';

import { EmbedConsentBannerCanonical } from '.';

interface ContextProps {
  service: Services;
}

const WithContext = ({
  children,
  service,
}: PropsWithChildren<ContextProps>) => (
  <ThemeProvider service={service}>
    <ServiceContextProvider service={service}>
      {children as JSX.Element}
    </ServiceContextProvider>
  </ThemeProvider>
);

describe('Embed Consent Banner', () => {
  it('should match snapshot', async () => {
    let container;

    await act(async () => {
      ({ container } = render(
        <WithContext service="mundo">
          <EmbedConsentBannerCanonical
            pageType={ARTICLE_PAGE}
            provider="youtube"
          />
        </WithContext>,
      ));
    });

    expect(container).toMatchSnapshot();
  });

  it('should render the banner when the user has not consented', async () => {
    let getByTestId!: (id: string) => HTMLElement;

    await act(async () => {
      ({ getByTestId } = render(
        <WithContext service="mundo">
          <EmbedConsentBannerCanonical
            pageType={ARTICLE_PAGE}
            provider="youtube"
          />
        </WithContext>,
      ));
    });

    expect(getByTestId('consentBanner')).toBeInTheDocument();
  });

  it('should not render the banner when the user has consented', async () => {
    let getByTestId!: (id: string) => HTMLElement;
    let queryByTestId!: (id: string) => HTMLElement | null;

    await act(async () => {
      ({ getByTestId, queryByTestId } = render(
        <WithContext service="mundo">
          <EmbedConsentBannerCanonical
            pageType={ARTICLE_PAGE}
            provider="youtube"
          >
            <div>Mock iframe content</div>
          </EmbedConsentBannerCanonical>
        </WithContext>,
      ));
    });

    const button = getByTestId('banner-button');

    fireEvent.click(button);

    expect(queryByTestId('consentBanner')).not.toBeInTheDocument();
  });

  it('should not render the banner when the pageType is not an Article page', async () => {
    let queryByTestId!: (id: string) => HTMLElement | null;

    await act(async () => {
      ({ queryByTestId } = render(
        <WithContext service="mundo">
          <EmbedConsentBannerCanonical pageType={STORY_PAGE} provider="youtube">
            <div>Mock iframe content</div>
          </EmbedConsentBannerCanonical>
        </WithContext>,
      ));
    });

    expect(queryByTestId('consentBanner')).not.toBeInTheDocument();
  });

  it('should not render the banner when the provider is not YouTube', async () => {
    let queryByTestId!: (id: string) => HTMLElement | null;

    await act(async () => {
      ({ queryByTestId } = render(
        <WithContext service="mundo">
          <EmbedConsentBannerCanonical
            pageType={ARTICLE_PAGE}
            provider="instagram"
          >
            <div>Mock iframe content</div>
          </EmbedConsentBannerCanonical>
        </WithContext>,
      ));
    });

    expect(queryByTestId('consentBanner')).not.toBeInTheDocument();
  });
});
