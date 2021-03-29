import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import * as scripts from '@bbc/gel-foundations/scripts';

import PodcastPromo from '.';

const assertTypeOfElement = (Component, type) => {
  const { container } = render(
    <Component script={scripts.latin} service="russian">
      Content
    </Component>,
  );

  expect(container.querySelector(type)).toBeInTheDocument();
  expect(container.querySelector(type).textContent).toBe('Content');
};

describe('Podcast Promo', () => {
  describe('Title', () => {
    assertTypeOfElement(PodcastPromo.Title, 'h2');
    shouldMatchSnapshot(
      'should match snapshot',
      <PodcastPromo.Title script={scripts.latin} service="russian">
        Content
      </PodcastPromo.Title>,
    );
  });

  describe('Card', () => {
    assertTypeOfElement(PodcastPromo.Title, 'div');
    shouldMatchSnapshot(
      'should match snapshot',
      <PodcastPromo.Card>Content</PodcastPromo.Card>,
    );
  });

  describe('Card Content', () => {
    assertTypeOfElement(PodcastPromo.Card.Content, 'div');
    shouldMatchSnapshot(
      'should match snapshot',
      <PodcastPromo.Card.Content>Content</PodcastPromo.Card.Content>,
    );
  });

  describe('Card Title', () => {
    assertTypeOfElement(PodcastPromo.Card.Title, 'h3');
    shouldMatchSnapshot(
      'should match snapshot',
      <PodcastPromo.Card.Title script={scripts.latin} service="russian">
        Content
      </PodcastPromo.Card.Title>,
    );
  });

  describe('Card Description', () => {
    assertTypeOfElement(PodcastPromo.Card.Description, 'p');
    shouldMatchSnapshot(
      'should match snapshot',
      <PodcastPromo.Card.Description script={scripts.latin} service="russian">
        Content
      </PodcastPromo.Card.Description>,
    );
  });

  describe('Card Image', () => {
    assertTypeOfElement(PodcastPromo.Card.ImageWrapper, 'div');
    shouldMatchSnapshot(
      'should match snapshot',
      <PodcastPromo.Card.ImageWrapper>Content</PodcastPromo.Card.ImageWrapper>,
    );
  });

  describe('Card Link', () => {
    assertTypeOfElement(PodcastPromo.Card.Link, 'a');
    shouldMatchSnapshot(
      'should match snapshot',
      <PodcastPromo.Card.Link href="https://www.bbc.com">
        Content
      </PodcastPromo.Card.Link>,
    );
  });

  describe('Card Episodes Text', () => {
    assertTypeOfElement(PodcastPromo.Card.EpisodesText, 'p');
    shouldMatchSnapshot(
      'should match snapshot',
      <PodcastPromo.Card.EpisodesText script={scripts.latin} service="russian">
        Episodes
      </PodcastPromo.Card.EpisodesText>,
    );
  });
});
