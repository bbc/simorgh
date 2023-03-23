import React from 'react';
import Footer from '#components/Footer';
import {
  render,
  screen,
} from '../../../components/react-testing-library-with-providers';

describe('Footer', () => {
  const { trustProjectLink, externalLink, links, copyrightText } = {
    trustProjectLink: {
      href: 'https://www.bbc.com/mundo/institucional-51359666',
      text: 'Por qué puedes confiar en la BBC',
    },
    externalLink: {
      href: 'https://www.bbc.co.uk/editorialguidelines/guidance/feeds-and-links',
      text: 'Lee sobre nuestra postura acerca de enlaces externos.',
    },
    links: [
      {
        href: 'https://www.bbc.com/mundo/institucional-36400005',
        text: 'Términos de uso',
      },
      {
        href: 'https://www.bbc.com/mundo/institucional-36400007',
        text: 'Sobre la BBC',
      },
      {
        href: 'https://www.bbc.com/mundo/institucional-36400009',
        text: 'Política de privacidad',
      },
      {
        href: 'https://www.bbc.com/usingthebbc/cookies/',
        text: 'Cookies',
      },
      {
        href: 'https://www.bbc.co.uk/send/u50853489',
        text: 'Contacta a la BBC',
      },
      {
        id: 'COOKIE_SETTINGS',
        href: 'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
        text: 'AdChoices / Do Not Sell My Info',
        lang: 'en-GB',
      },
    ],
    copyrightText:
      'BBC. La BBC no se hace responsable del contenido de sitios externos.',
  };

  describe('AMP', () => {
    it('should render the cookie settings link as a button element', () => {
      render(
        <Footer
          isAmp
          links={links}
          copyrightText={copyrightText}
          externalLink={externalLink}
          trustProjectLink={trustProjectLink}
        />,
      );
      expect(
        screen.getByText('AdChoices / Do Not Sell My Info'),
      ).toHaveAttribute('data-testid', 'amp-cookie-settings-button');
    });
  });

  describe('Canonical', () => {
    it('should render the cookie settings link as an anchor element', () => {
      render(
        <Footer
          links={links}
          copyrightText={copyrightText}
          externalLink={externalLink}
          trustProjectLink={trustProjectLink}
        />,
      );
      expect(
        screen.getByText('AdChoices / Do Not Sell My Info'),
      ).toHaveAttribute(
        'href',
        'https://www.bbc.com/usingthebbc/cookies/how-does-the-bbc-use-cookies-for-advertising/',
      );
    });
  });
});
