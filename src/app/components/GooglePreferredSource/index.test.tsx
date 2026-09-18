import { render } from '#app/components/react-testing-library-with-providers';
import isGoogleReferral from '#app/lib/utilities/isGoogleReferral';
import GooglePreferredSource from '.';

jest.mock('#app/lib/utilities/isGoogleReferral');

describe('GooglePreferredSource', () => {
  const mockIsGoogleReferral = jest.mocked(isGoogleReferral);

  it('renders the supplied link text and Google Preferred Sources URL', () => {
    mockIsGoogleReferral.mockReturnValue(true);

    const linkText = 'Google पर पसंदीदा स्रोत के रूप में जोड़ें';
    const { getByRole } = render(<GooglePreferredSource />, {
      service: 'hindi',
    });

    const link = getByRole('link', { name: linkText });

    expect(link).toHaveAttribute(
      'href',
      'https://www.google.com/preferences/source?q=bbc.com',
    );
  });

  it('does not render for non-Google traffic', () => {
    mockIsGoogleReferral.mockReturnValue(false);

    const { queryByRole } = render(<GooglePreferredSource />, {
      service: 'hindi',
    });

    expect(queryByRole('link')).not.toBeInTheDocument();
  });
});
