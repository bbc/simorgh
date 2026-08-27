import { screen } from '@testing-library/react';
import { render } from '../../../components/react-testing-library-with-providers';
import ErrorMain from './index';

describe('ErrorMain', () => {
  const messaging = {
    statusCode: 'StatusCode',
    title: 'A error has occured',
    message: 'Something happened, please try an option',
    solutions: ['Option one', 'Option two'],
    callToActionFirst: 'You can do ',
    callToActionLinkText: 'this',
    callToActionLinkUrl: 'https://www.bbc.com',
    callToActionLast: ' thing',
  };
  it('should correctly render for an error page for News', () => {
    render(<ErrorMain {...messaging} dir="ltr" />, {
      service: 'news',
    });
    expect(screen.getByText(messaging.title)).toBeInTheDocument();
    expect(screen.getByText(messaging.message)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: messaging.callToActionLinkText }),
    ).toHaveAttribute('href', messaging.callToActionLinkUrl);
  });

  const arabicServices = ['persian', 'arabic', 'pashto', 'urdu', 'dari'];
  arabicServices.forEach(service => {
    it(`should correctly render for an error page for ${service}`, () => {
      render(<ErrorMain {...messaging} dir="rtl" />, {
        service,
      });
      expect(screen.getByText(messaging.title)).toBeInTheDocument();
    });
  });
});
