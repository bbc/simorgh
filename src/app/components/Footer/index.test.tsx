import React from 'react';
import Footer from '#app/components/Footer';
import { render, screen } from '../react-testing-library-with-providers';

describe('Footer', () => {
  const { trustProjectLink, externalLink, links, copyrightText, collectiveNewsroomText } = {
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
        href: '#',
        text: 'Do not share or sell my info',
        lang: 'en-GB',
      },
    ],
    copyrightText:
      'BBC. La BBC no se hace responsable del contenido de sitios externos.',
    collectiveNewsroomText: 'A Collective Newsroom Publication for BBC'
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
      expect(screen.getByText('Do not share or sell my info')).toHaveAttribute(
        'data-testid',
        'amp-cookie-settings-button',
      );
    });
  });

  describe('Canonical', () => {
    it('should render the "Do not share or sell my info" link as an anchor element when outside of UK', () => {
      render(
        <Footer
          links={links}
          copyrightText={copyrightText}
          externalLink={externalLink}
          trustProjectLink={trustProjectLink}
          showAdsBasedOnLocation
        />,
      );
      expect(screen.getByText('Do not share or sell my info')).toHaveAttribute(
        'href',
        '#',
      );
    });
  });

  describe('Collective News Text', () => {

    it('should render the Collective News text when it is present', () => {
      render(
        <Footer
          isAmp
          links={links}
          copyrightText={copyrightText}
          externalLink={externalLink}
          trustProjectLink={trustProjectLink}
          collectiveNewsroomText={collectiveNewsroomText}
        />,
      );
      expect(screen.getByText('A Collective Newsroom Publication for BBC')).toBeInTheDocument;
      
    });
  });
});
