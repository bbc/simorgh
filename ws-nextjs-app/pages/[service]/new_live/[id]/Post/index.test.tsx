import React from 'react';
import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import postFixture from '#data/pidgin/posts/postFixtureCleaned.json';
import Post from './index';

const singlePostWithTitle = postFixture.data.results[0];

const singlePostWithTitleAndSubtitle = postFixture.data.results[2];

describe('Post', () => {
  describe('Header', () => {
    it('should render h3 title when provided', async () => {
      await act(async () => {
        render(<Post post={singlePostWithTitle} />);
      });

      expect(screen.getByText('Breaking news headline')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeTruthy();
    });

    it('should render h3 with title and subtitle when provided', async () => {
      await act(async () => {
        render(<Post post={singlePostWithTitleAndSubtitle} />);
      });

      expect(screen.getByText('Another post')).toBeInTheDocument();
      expect(screen.getByText('Another post sub headline')).toBeInTheDocument();
      expect(screen.getAllByRole('heading', { level: 3 })).toBeTruthy();
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1);
    });
  });
  describe('Content', () => {
    it('should render paragraphs when provided', async () => {
      await act(async () => {
        render(<Post post={singlePostWithTitle} />);
      });

      expect(screen.getByText('Breaking news')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Bharat na name wey most pipo dey call India for Hindi language. Wen e come to official communication for English, dem dey always use India.',
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Narendra Modi goment don dey change dis practice wey dem don dey do for long time.',
        ),
      ).toBeInTheDocument();
    });

    it('should render a list when provided', async () => {
      await act(async () => {
        render(<Post post={singlePostWithTitleAndSubtitle} />);
      });

      expect(screen.getByRole('list')).toBeTruthy();
      expect(screen.getAllByRole('listitem')).toHaveLength(4);
    });
  });
});
