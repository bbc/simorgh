import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';

import postsFixture from '#data/pidgin/posts/postFixture.json';
import Stream from './index';

const firstPostData = postsFixture.data.results[0];
const secondPostData = postsFixture.data.results[1];

const mockStreamContentEmpty = {
  data: { results: [] },
};

const mockStreamContentSingle = {
  data: { results: [firstPostData] },
};

const mockStreamContentMoreThanOne = {
  data: { results: [firstPostData, secondPostData] },
};

describe('Live Page Stream', () => {
  it('should return null with no stream content posts', async () => {
    await act(async () => {
      render(
        <Stream streamContent={mockStreamContentEmpty} contributors={null} />,
      );
    });

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('should render a single stream content post with no ordered list', async () => {
    await act(async () => {
      render(
        <Stream streamContent={mockStreamContentSingle} contributors={null} />,
      );
    });

    expect(
      screen.getAllByRole('heading', {
        name: /Breaking News/i,
      }),
    ).toHaveLength(1);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should render multiple stream content posts within a list', async () => {
    await act(async () => {
      render(
        <Stream
          streamContent={mockStreamContentMoreThanOne}
          contributors={null}
        />,
      );
    });

    expect(
      screen.getAllByRole('heading', {
        name: /Breaking News/i,
      }),
    ).toHaveLength(1);
    expect(
      screen.getAllByRole('heading', {
        name: /Published 6.07pm Tues 9th/i,
      }),
    ).toHaveLength(1);
    expect(screen.queryByRole('list')).toBeInTheDocument();
  });

  it('should render contributors when supplied', async () => {
    await act(async () => {
      render(
        <Stream
          streamContent={mockStreamContentSingle}
          contributors="Not a random dude"
        />,
      );
    });
    expect(screen.queryByTestId('live-contributors')).toBeInTheDocument();
  });

  it('should not render contributors when they are null', async () => {
    await act(async () => {
      render(
        <Stream streamContent={mockStreamContentSingle} contributors={null} />,
      );
    });

    expect(screen.queryByTestId('live-contributors')).not.toBeInTheDocument();
  });
  it('should render share button when share api is availible', async () => {
    // @ts-expect-error overwrites share to exist
    window.navigator.share = {};

    await act(async () => {
      render(
        <Stream streamContent={mockStreamContentSingle} contributors={null} />,
      );
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('should not render share button when share api is unavailible', async () => {
    // @ts-expect-error overwrites share to exist
    delete window.navigator.share;

    await act(async () => {
      render(
        <Stream streamContent={mockStreamContentSingle} contributors={null} />,
      );
    });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
