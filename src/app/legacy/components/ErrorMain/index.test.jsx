import React from 'react';
import latin from '#components/ThemeProvider/fontScripts/latin';
import arabic from '#components/ThemeProvider/fontScripts/arabic';
import { render } from '#components/react-testing-library-with-providers';
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
    service: 'news',
  };
  it('should correctly render for an error page for News', () => {
    const { container } = render(
      <ErrorMain {...messaging} dir="ltr" script={latin} service="news" />,
    );
    expect(container).toMatchSnapshot();
  });

  const arabicServices = ['persian', 'arabic', 'pashto', 'urdu'];
  arabicServices.forEach(service => {
    it(`should correctly render for an error page for ${service}`, () => {
      const { container } = render(
        <ErrorMain
          {...messaging}
          dir="rtl"
          script={arabic}
          service={service}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
