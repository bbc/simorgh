import { PropsWithChildren } from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ThemeProvider from '../ThemeProvider';

import { EmbedConsentBannerCanonical } from '.';

// TODO: Get service from Global types
interface ContextProps {
  service?: string;
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
  it('should render the banner when the user has not consented', async () => {
    let getByTestId!: (id: string) => HTMLElement;

    await act(async () => {
      ({ getByTestId } = render(
        <WithContext service="archive">
          <EmbedConsentBannerCanonical pageType="article" provider="youtube" />
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
        <WithContext service="archive">
          <EmbedConsentBannerCanonical pageType="article" provider="youtube">
            <div>Mock iframe content</div>
          </EmbedConsentBannerCanonical>
        </WithContext>,
      ));
    });

    const button = getByTestId('banner-button');

    fireEvent.click(button);

    expect(queryByTestId('consentBanner')).not.toBeInTheDocument();
  });
});
