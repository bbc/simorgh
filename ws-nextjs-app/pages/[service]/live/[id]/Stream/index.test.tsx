import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import MockIntersectionObserver from '#app/components/intersection-observer-testing-library';
import postsFixture from '#data/pidgin/posts/postFixture.json';
import Stream from './index';

const postFixture = postsFixture.data.results[0];

const mockStreamContentEmpty = {
  results: [],
};

const mockStreamContentSingle = {
  results: [postFixture],
};

const mockStreamDataMoreThanOne = {
  results: [postFixture, postFixture],
};

const mockIntersectionObserver = new MockIntersectionObserver();

describe('Live Page Stream', () => {
  beforeEach(() => {
    // @ts-expect-error mocking required for tests
    global.IntersectionObserver = jest.fn(
      mockIntersectionObserver.getMockIntersectionObserver(),
    );
  });

  afterEach(() => {
    mockIntersectionObserver.clearObservers();
  });

  it('should return null with no stream content posts', async () => {
    await act(async () => {
      render(
        <Stream
          streamData={mockStreamContentEmpty}
          contributors={null}
          setIsFirstPostVisible={() => {
            return null;
          }}
          streamRef={null}
          applyPendingUpdate={() => {
            return null;
          }}
        />,
      );
    });

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('should render a single stream content post with no ordered list', async () => {
    await act(async () => {
      render(
        <Stream
          streamData={mockStreamContentSingle}
          contributors={null}
          setIsFirstPostVisible={() => {
            return null;
          }}
          streamRef={null}
          applyPendingUpdate={() => {
            return null;
          }}
        />,
      );
    });

    expect(
      screen.getAllByRole('heading', {
        name: /Breaking News/i,
      }),
    ).toHaveLength(1);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should render a more than one stream content posts within a list', async () => {
    await act(async () => {
      render(
        <Stream
          streamData={mockStreamDataMoreThanOne}
          contributors={null}
          setIsFirstPostVisible={() => {
            return null;
          }}
          streamRef={null}
          applyPendingUpdate={() => {
            return null;
          }}
        />,
      );
    });

    expect(
      screen.getAllByRole('heading', {
        name: /Breaking News/i,
      }),
    ).toHaveLength(2);
    expect(screen.queryByRole('list')).toBeInTheDocument();
  });

  it('should call all relevant functions when the first post is on the screen', async () => {
    const isVisibleCallback = jest.fn();
    const applyUpdateCallback = jest.fn();
    await act(async () => {
      render(
        <Stream
          streamData={mockStreamDataMoreThanOne}
          contributors={null}
          setIsFirstPostVisible={isVisibleCallback}
          streamRef={null}
          applyPendingUpdate={applyUpdateCallback}
        />,
      );
    });
    mockIntersectionObserver.triggerAllObservers();
    expect(isVisibleCallback).toHaveBeenCalledWith(true);
    expect(applyUpdateCallback).toHaveBeenCalledTimes(1);
  });

  it('should render contributors when supplied', async () => {
    await act(async () => {
      render(
        <Stream
          streamData={mockStreamContentSingle}
          contributors="Not a random dude"
          setIsFirstPostVisible={() => {
            return null;
          }}
          streamRef={null}
          applyPendingUpdate={() => {
            return null;
          }}
        />,
      );
    });
    expect(screen.queryByTestId('live-contributors')).toBeInTheDocument();
  });

  it('should not render contributors when they are null', async () => {
    await act(async () => {
      render(
        <Stream
          streamData={mockStreamContentSingle}
          contributors={null}
          setIsFirstPostVisible={() => {
            return null;
          }}
          streamRef={null}
          applyPendingUpdate={() => {
            return null;
          }}
        />,
      );
    });

    expect(screen.queryByTestId('live-contributors')).not.toBeInTheDocument();
  });
  it('should render share button when share api is availible', async () => {
    // @ts-expect-error overwrites share to exist
    window.navigator.share = {};

    await act(async () => {
      render(
        <Stream
          streamData={mockStreamContentSingle}
          contributors={null}
          setIsFirstPostVisible={() => {
            return null;
          }}
          streamRef={null}
          applyPendingUpdate={() => {
            return null;
          }}
        />,
      );
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should not render share button when share api is unavailible', async () => {
    // @ts-expect-error overwrites share to exist
    delete window.navigator.share;

    await act(async () => {
      render(
        <Stream
          streamData={mockStreamContentSingle}
          contributors={null}
          setIsFirstPostVisible={() => {
            return null;
          }}
          streamRef={null}
          applyPendingUpdate={() => {
            return null;
          }}
        />,
      );
    });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
