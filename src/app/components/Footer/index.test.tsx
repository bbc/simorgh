import Footer from '#app/components/Footer';
import { render, screen } from '../react-testing-library-with-providers';

describe('Footer', () => {
  it('should render extra links when they are present', () => {
    render(<Footer />, { service: 'ws' });

    const links = [
      {
        text: 'BBC Studios Commercial Opportunities',
        href: 'https://bbcnews.bbcstudios.com',
      },
      {
        text: 'Global Shortwave Frequencies',
        href: 'https://www.bbc.com/programmes/articles/2x9tqt6mc05vB2S37j8MWMJ/global-short-wave-frequencies',
      },
    ];

    const listElements = screen.getAllByRole('list');
    expect(listElements).toHaveLength(2);

    links.forEach(({ text, href }) => {
      const linkElement = screen.getByText(text);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', href);
    });
  });

  describe('Canonical', () => {
    it('should render the "Do not share or sell my info" link as an anchor element when outside of UK', () => {
      render(<Footer />, { showAdsBasedOnLocation: true });
      expect(screen.getByText('Do not share or sell my info')).toHaveAttribute(
        'href',
        '#',
      );
    });

    it('should not render an empty list item when the "Do not share or sell my info" link is not present', () => {
      render(<Footer />, { showAdsBasedOnLocation: false });
      const listItems = screen.getAllByRole('listitem');
      listItems.forEach(listItem => {
        expect(listItem).not.toBeEmptyDOMElement();
      });
    });
  });

  describe('Collective News Text', () => {
    it('should render the Collective Newsroom text when it is present', () => {
      render(<Footer />, {
        service: 'hindi',
      });
      expect(
        screen.getByText('बीबीसी के लिए कलेक्टिव न्यूज़रूम की ओर से प्रकाशित'),
      ).toBeInTheDocument();
    });

    it('should not render the Collective Newsroom text within a <p> tag when it is not present', () => {
      const { container } = render(<Footer />);
      const paragraphs = container.getElementsByTagName('p').length;

      expect(paragraphs).toEqual(1);
    });
  });
});
