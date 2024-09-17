import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import latin from '#components/ThemeProvider/fontScripts/latin';

import PodcastPromo from '.';

const assertTypeOfElement = (Component, type) => {
  const { container } = render(
    <Component script={latin} service="russian">
      Content
    </Component>,
  );

  expect(container.querySelector(type)).toBeInTheDocument();
  expect(container.querySelector(type).textContent).toBe('Content');
};

describe('Podcast Promo', () => {
  describe('Title', () => {
    assertTypeOfElement(PodcastPromo.Title, 'h2');
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Title script={latin} service="russian" dir="ltr">
          Content
        </PodcastPromo.Title>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Card', () => {
    assertTypeOfElement(PodcastPromo.Title, 'div');
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Card>Content</PodcastPromo.Card>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Card Content', () => {
    assertTypeOfElement(PodcastPromo.Card.Content, 'div');
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Card.Content>Content</PodcastPromo.Card.Content>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Card Title', () => {
    assertTypeOfElement(PodcastPromo.Card.Title, 'h3');
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Card.Title script={latin} service="russian">
          Content
        </PodcastPromo.Card.Title>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Card Description', () => {
    assertTypeOfElement(PodcastPromo.Card.Description, 'p');
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Card.Description script={latin} service="russian">
          Content
        </PodcastPromo.Card.Description>,
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
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Card Episodes Text', () => {
    assertTypeOfElement(PodcastPromo.Card.EpisodesText, 'p');
    it('should match snapshot', () => {
      const { container } = render(
        <PodcastPromo.Card.EpisodesText
          script={latin}
          service="russian"
          dir="ltr"
        >
          Episodes
        </PodcastPromo.Card.EpisodesText>,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
