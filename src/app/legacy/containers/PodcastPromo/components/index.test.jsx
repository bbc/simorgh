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
  });

  describe('Card', () => {
    assertTypeOfElement(PodcastPromo.Title, 'div');
  });

  describe('Card Content', () => {
    assertTypeOfElement(PodcastPromo.Card.Content, 'div');
  });

  describe('Card Title', () => {
    assertTypeOfElement(PodcastPromo.Card.Title, 'h3');
  });

  describe('Card Description', () => {
    assertTypeOfElement(PodcastPromo.Card.Description, 'p');
  });

  describe('Card Image', () => {
    assertTypeOfElement(PodcastPromo.Card.ImageWrapper, 'div');
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
  });
});
