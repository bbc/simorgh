import React from 'react';
import {
  render,
  screen,
  act,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import Header from './index';

describe('Live Page Header', () => {
  describe('title and description', () => {
    it('should render a title and description when provided', async () => {
      await act(async () => {
        render(
          <Header
            title="I am a title"
            description="I am a description"
            showLiveLabel
          />,
        );
      });

      expect(screen.getByText('I am a title')).toBeInTheDocument();
      expect(screen.getByText('I am a description')).toBeInTheDocument();
    });

    it('should render a title if only a title is provided', async () => {
      await act(async () => {
        render(<Header title="I am a title" showLiveLabel />);
      });

      expect(screen.getByText('I am a title')).toBeInTheDocument();
    });
  });
  describe('live label', () => {
    it('should render if the liveLabel flag is true', async () => {
      await act(async () => {
        render(<Header title="I am a title" showLiveLabel />);
      });

      expect(screen.getByTestId('live-label')).toBeInTheDocument();
    });

    it('should not render if the liveLabel flag is false', async () => {
      await act(async () => {
        render(<Header title="I am a title" showLiveLabel={false} />);
      });

      expect(screen.queryByTestId('live-label')).not.toBeInTheDocument();
    });
  });
  describe('image', () => {
    it('should render if a header image if provided', async () => {
      await act(async () => {
        render(
          <Header
            title="I am a title"
            showLiveLabel
            imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
            imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
            imageWidth={660}
          />,
        );
      });

      await waitFor(() => {
        const headerImage = screen.getByRole('presentation');
        expect(headerImage.getAttribute('src')).toEqual(
          'https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg',
        );
      });
    });

    it('should not render if a header image if not provided', async () => {
      await act(async () => {
        render(
          <Header
            title="I am a title"
            showLiveLabel
            imageUrl={undefined}
            imageUrlTemplate={undefined}
            imageWidth={undefined}
          />,
        );
      });

      await waitFor(() => {
        const headerImage = screen.queryByRole('img');
        expect(headerImage).toBeNull();
      });
    });
  });
  describe('a11y', () => {
    it('should have id of content', async () => {
      await act(async () => {
        render(<Header title="I am a title" showLiveLabel />);
      });

      const header = document.getElementById('content');
      expect(header).toBeInTheDocument();
    });

    it('should have tab index of -1', async () => {
      await act(async () => {
        render(<Header title="I am a title" showLiveLabel />);
      });

      const header = document.getElementById('content');
      const tabIndex = header?.getAttribute('tabIndex');

      expect(tabIndex).toEqual('-1');
    });
  });
});
