import React from 'react';
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
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Title dir="ltr">Content</PodcastPromo.Title>,
        { service: 'russian' },
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Card', () => {
    assertTypeOfElement(PodcastPromo.Title, 'div');
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Card>Content</PodcastPromo.Card>,
        { service: 'russian' },
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Card Content', () => {
    assertTypeOfElement(PodcastPromo.Card.Content, 'div');
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Card.Content>Content</PodcastPromo.Card.Content>,
        { service: 'russian' },
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Card Title', () => {
    assertTypeOfElement(PodcastPromo.Card.Title, 'h3');
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Card.Title>Content</PodcastPromo.Card.Title>,
        { service: 'russian' },
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Card Description', () => {
    assertTypeOfElement(PodcastPromo.Card.Description, 'p');
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Card.Description>Content</PodcastPromo.Card.Description>,
        { service: 'russian' },
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Card Image', () => {
    assertTypeOfElement(PodcastPromo.Card.ImageWrapper, 'div');
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Card.ImageWrapper>
          Content
        </PodcastPromo.Card.ImageWrapper>,
        { service: 'russian' },
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Card Link', () => {
    assertTypeOfElement(PodcastPromo.Card.Link, 'a');
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Card.Link href="https://www.bbc.com">
          Content
        </PodcastPromo.Card.Link>,
        { service: 'russian' },
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Card Episodes Text', () => {
    assertTypeOfElement(PodcastPromo.Card.EpisodesText, 'p');
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Card.EpisodesText dir="ltr">
          Episodes
        </PodcastPromo.Card.EpisodesText>,
        { service: 'russian' },
      );
      expect(container).toMatchSnapshot();
    });
  });
});
