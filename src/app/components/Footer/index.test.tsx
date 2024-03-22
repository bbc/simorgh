import React from 'react';
import Footer from '#app/components/Footer';
import { render, screen } from '../react-testing-library-with-providers';

const RealDate = Date;

describe('Footer', () => {
  beforeEach(() => {
    // @ts-expect-error need to override Date so that the current year is always 3000
    global.Date = class extends RealDate {
      constructor() {
        super();
        return new RealDate('3000-01-01T12:00:00');
      }
    };
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  describe('snapshots', () => {
    it('should render correctly', () => {
      const { container } = render(<Footer />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('assertions', () => {
    describe('copyright', () => {
      it('should contain copyright text', () => {
        const { container } = render(<Footer />);

        const paragraph = container.getElementsByTagName('p')[0];

        const copyrightSymbol = paragraph.getElementsByTagName('span')[0];
        paragraph.removeChild(copyrightSymbol);

        const externalLink = paragraph.getElementsByTagName('a')[0];
        paragraph.removeChild(externalLink);

        expect(paragraph.textContent).toEqual(
          '3000 BBC. The BBC is not responsible for the content of external sites. ',
        );
      });

      it('should contain a copyright symbol wrapped in span', () => {
        const { container } = render(<Footer />);

        const paragraph = container.getElementsByTagName('p')[0];
        const copyrightSymbol = paragraph.getElementsByTagName('span')[0];

        expect(copyrightSymbol.textContent).toEqual('© ');
      });
    });

    it('should contain an external link', () => {
      const { container } = render(<Footer />);

      const paragraph = container.getElementsByTagName('p')[0];
      const externalLink = paragraph.getElementsByTagName('a')[0];

      expect(externalLink.textContent).toEqual(
        'Read about our approach to external linking.',
      );
    });

    it('should omit the footer when isApp is set to true', () => {
      const { container } = render(<Footer />, { isApp: true });

      const footer = container.querySelector("footer[role='contentinfo']");

      expect(footer).toBeNull();
    });
  });

  describe('AMP', () => {
    it('should render the cookie settings link as a button element', () => {
      render(<Footer />, { isAmp: true });
      expect(screen.getByText('Do not share or sell my info')).toHaveAttribute(
        'data-testid',
        'amp-cookie-settings-button',
      );
    });
  });

  describe('Canonical', () => {
    it('should render the "Do not share or sell my info" link as an anchor element when outside of UK', () => {
      render(<Footer />, { service: 'pidgin', showAdsBasedOnLocation: true });
      expect(screen.getByText('Do not share or sell my info')).toHaveAttribute(
        'href',
        '#',
      );
    });
  });
});
