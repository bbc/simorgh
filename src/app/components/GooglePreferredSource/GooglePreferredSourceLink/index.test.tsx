import { render } from '#app/components/react-testing-library-with-providers';
import isGoogleReferral from '#app/lib/utilities/isGoogleReferral';
import useToggle from '#hooks/useToggle';
import GooglePreferredSource from '.';

jest.mock('#app/lib/utilities/isGoogleReferral');
jest.mock('#hooks/useToggle');

describe('GooglePreferredSource', () => {
  const mockIsGoogleReferral = jest.mocked(isGoogleReferral);
  const mockUseToggle = jest.mocked(useToggle);

  it('renders the supplied link text and Google Preferred Sources URL', () => {
    mockIsGoogleReferral.mockReturnValue(true);
    mockUseToggle.mockReturnValue({ enabled: true, value: null });

    const linkText = 'Google पर पसंदीदा स्रोत के रूप में जोड़ें';
    const { getByText } = render(<GooglePreferredSource />, {
      service: 'hindi',
    });

    const link = getByText(linkText);

    expect(link).toHaveAttribute(
      'href',
      'https://www.google.com/preferences/source?q=bbc.com',
    );
  });

  it('does not render for non-Google traffic', () => {
    mockIsGoogleReferral.mockReturnValue(false);
    mockUseToggle.mockReturnValue({ enabled: true, value: null });

    const { queryByRole } = render(<GooglePreferredSource />, {
      service: 'hindi',
    });

    expect(queryByRole('link')).not.toBeInTheDocument();
  });

  it('does not render if toggled off', () => {
    mockIsGoogleReferral.mockReturnValue(true);
    mockUseToggle.mockReturnValue({ enabled: false, value: null });

    const { queryByRole } = render(<GooglePreferredSource />, {
      service: 'hindi',
    });

    expect(queryByRole('link')).not.toBeInTheDocument();
  });
});
