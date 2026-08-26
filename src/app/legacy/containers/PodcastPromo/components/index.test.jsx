import { render } from '../../../../components/react-testing-library-with-providers';

import PodcastPromo from '.';

const assertTypeOfElement = (Component, type) => {
  const { container } = render(<Component>Content</Component>, {
    service: 'russian',
  });

  expect(container.querySelector(type)).toBeInTheDocument();
  expect(container.querySelector(type).textContent).toBe('Content');
};

describe('Podcast Promo', () => {
  describe('Title', () => {
    assertTypeOfElement(PodcastPromo.Title, 'h2');
    it('should render title with correct text', () => {
      const { getByText } = render(
        <PodcastPromo.Title dir="ltr">Content</PodcastPromo.Title>,
        { service: 'russian' },
      );
      expect(getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Card', () => {
    assertTypeOfElement(PodcastPromo.Title, 'div');
    it('should render card with content', () => {
      const { getByText } = render(
        <PodcastPromo.Card>Content</PodcastPromo.Card>,
        { service: 'russian' },
      );
      expect(getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Card Content', () => {
    assertTypeOfElement(PodcastPromo.Card.Content, 'div');
    it('should render card content', () => {
      const { getByText } = render(
        <PodcastPromo.Card.Content>Content</PodcastPromo.Card.Content>,
        { service: 'russian' },
      );
      expect(getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Card Title', () => {
    assertTypeOfElement(PodcastPromo.Card.Title, 'h3');
    it('should render card title', () => {
      const { getByText } = render(
        <PodcastPromo.Card.Title>Content</PodcastPromo.Card.Title>,
        { service: 'russian' },
      );
      expect(getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Card Description', () => {
    assertTypeOfElement(PodcastPromo.Card.Description, 'p');
    it('should render card description', () => {
      const { getByText } = render(
        <PodcastPromo.Card.Description>Content</PodcastPromo.Card.Description>,
        { service: 'russian' },
      );
      expect(getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Card Image', () => {
    assertTypeOfElement(PodcastPromo.Card.ImageWrapper, 'div');
    it('should render image wrapper', () => {
      const { getByText } = render(
        <PodcastPromo.Card.ImageWrapper>
          Content
        </PodcastPromo.Card.ImageWrapper>,
        { service: 'russian' },
      );
      expect(getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Card Link', () => {
    assertTypeOfElement(PodcastPromo.Card.Link, 'a');
    it('should render link with href', () => {
      const { getByRole } = render(
        <PodcastPromo.Card.Link href="https://www.bbc.com">
          Content
        </PodcastPromo.Card.Link>,
        { service: 'russian' },
      );
      expect(getByRole('link')).toHaveAttribute('href', 'https://www.bbc.com');
    });
  });

  describe('Card Episodes Text', () => {
    assertTypeOfElement(PodcastPromo.Card.EpisodesText, 'p');
    it('should render episodes text', () => {
      const { getByText } = render(
        <PodcastPromo.Card.EpisodesText dir="ltr">
          Episodes
        </PodcastPromo.Card.EpisodesText>,
        { service: 'russian' },
      );
      expect(getByText('Episodes')).toBeInTheDocument();
    });
  });
});
