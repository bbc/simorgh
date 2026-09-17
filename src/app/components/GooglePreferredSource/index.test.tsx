import { render } from '#app/components/react-testing-library-with-providers';
import isGoogleReferral from '#app/lib/utilities/isGoogleReferral';
import GooglePreferredSource from '.';

jest.mock('#app/lib/utilities/isGoogleReferral');

describe('GooglePreferredSource', () => {
  const mockIsGoogleReferral = jest.mocked(isGoogleReferral);

  it('renders the supplied link text and Google Preferred Sources URL', () => {
    mockIsGoogleReferral.mockReturnValue(true);

    const linkText = 'Add as preferred on Google';
    const { getByRole } = render(<GooglePreferredSource linkText={linkText} />);

    const link = getByRole('link', { name: linkText });

    expect(link).toHaveAttribute(
      'href',
      'https://www.google.com/preferences/source?q=bbc.com',
    );
  });

  it('does not render for non-Google traffic', () => {
    mockIsGoogleReferral.mockReturnValue(false);

    const { queryByRole } = render(
      <GooglePreferredSource linkText="Add as preferred on Google" />,
    );

    expect(queryByRole('link')).not.toBeInTheDocument();
  });
});
