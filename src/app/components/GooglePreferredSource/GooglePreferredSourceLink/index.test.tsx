import { render } from '#app/components/react-testing-library-with-providers';
import GooglePreferredSource from '.';

describe('GooglePreferredSource', () => {
  it('renders the supplied link text and Google Preferred Sources URL', () => {
    const linkText = 'Google पर पसंदीदा स्रोत के रूप में जोड़ें';
    const { getByText } = render(
      <GooglePreferredSource
        isGoogleReferralTraffic
        googlePreferredSourceEnabled
      />,
      { service: 'hindi' },
    );

    const link = getByText(linkText);

    expect(link).toHaveAttribute(
      'href',
      'https://www.google.com/preferences/source?q=bbc.com',
    );
  });

  it('does not render for non-Google traffic', () => {
    const { queryByRole } = render(
      <GooglePreferredSource
        isGoogleReferralTraffic={false}
        googlePreferredSourceEnabled
      />,
      { service: 'hindi' },
    );

    expect(queryByRole('link')).not.toBeInTheDocument();
  });

  it('does not render if toggled off', () => {
    const { queryByRole } = render(
      <GooglePreferredSource
        isGoogleReferralTraffic
        googlePreferredSourceEnabled={false}
      />,
      { service: 'hindi' },
    );

    expect(queryByRole('link')).not.toBeInTheDocument();
  });
});
