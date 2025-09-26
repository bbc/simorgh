import React from 'react';

import { render } from '../../../components/react-testing-library-with-providers';
import FooterContainer from '.';

describe(`FooterContainer`, () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('3000-01-01T12:00:00Z'));
  });

  describe('snapshots', () => {
    it('should render correctly', () => {
      const { container } = render(<FooterContainer />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('assertions', () => {
    it('should contain copyright text', () => {
      const { container } = render(<FooterContainer />);

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
      const { container } = render(<FooterContainer />);

      const paragraph = container.getElementsByTagName('p')[0];
      const copyrightSymbol = paragraph.getElementsByTagName('span')[0];

      expect(copyrightSymbol.textContent).toEqual('© ');
    });

    it('should contain an external link', () => {
      const { container } = render(<FooterContainer />);

      const paragraph = container.getElementsByTagName('p')[0];
      const externalLink = paragraph.getElementsByTagName('a')[0];

      expect(externalLink.textContent).toEqual(
        'Read about our approach to external linking.',
      );
    });

    it('should omit the footer when isApp is set to true', () => {
      const { container } = render(<FooterContainer />, { isApp: true });

      const footer = container.querySelector("footer[role='contentinfo']");

      expect(footer).toBeNull();
    });
  });
});
